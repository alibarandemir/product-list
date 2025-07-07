// backend/controllers/productController.js
import fs from 'fs/promises';
import path from 'path';
import { getGoldPrice } from '../services/goldPriceService.js';

export const getProducts = async (req, res) => {
  try {
    const goldPrice = await getGoldPrice();
    if (!goldPrice) {
      return res.status(500).json({ 
        success: false,
        message: 'Altın fiyatı alınamadı',
        data: null
      });
    }

    const filePath = path.resolve('data/products.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(fileData);

    // Price ve 5 üzerinden popularityScore'u biz hesaplayıp cevaba ekliyoruz
    let enriched = products.map((product) => {
      const price = ((product.popularityScore + 1) * product.weight * goldPrice).toFixed(2);
      return {
        ...product,
        price: Number(price),
        popularityOutOf5: +(product.popularityScore * 5).toFixed(1)
      };
    });

    // Query parametrelerini al
    const { minPrice, maxPrice, minScore, maxScore } = req.query;

    // Filtreleme işlemleri
    if (minPrice) {
      enriched = enriched.filter(p => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      enriched = enriched.filter(p => p.price <= parseFloat(maxPrice));
    }

    if (minScore) {
      enriched = enriched.filter(p => p.popularityOutOf5 >= parseFloat(minScore));
    }

    if (maxScore) {
      enriched = enriched.filter(p => p.popularityOutOf5 <= parseFloat(maxScore));
    }

    res.json({
      success: true,
      message: 'Ürünler başarıyla getirildi',
      data: enriched
    });
  } catch (error) {
    console.error('Hata:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Sunucu hatası',
      data: null
    });
  }
};
