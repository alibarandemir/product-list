// backend/services/goldService.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const getGoldPrice = async () => {
  try {
    const response = await axios.get('https://www.goldapi.io/api/XAU/USD', {
      headers: {
        'x-access-token': process.env.GOLD_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    return response.data.price; // USD per gram
  } catch (error) {
    console.error('Altın fiyatı alınamadı:', error.message);
    return null;
  }
};
