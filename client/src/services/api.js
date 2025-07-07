import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Axios instance oluşturma
const api = axios.create({
    baseURL: API_URL + '/api',
    timeout: 10000, // 10 saniye timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

export const fetchProducts = async (filters = {}) => {
    try {
        // Filtreleri query string'e dönüştür
        const params = new URLSearchParams();
        
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.minScore) params.append('minScore', filters.minScore);
        if (filters.maxScore) params.append('maxScore', filters.maxScore);

        const response = await api.get('/products', { params });
        return response.data; // axios otomatik olarak json parse ediyor
    } catch (error) {
        if (error.response) {
            // Server error response geldi
            throw new Error(error.response.data.message || 'Server error');
        } else if (error.request) {
            // İstek yapıldı ama cevap gelmedi
            throw new Error('No response from server');
        } else {
            // İstek oluşturulurken hata oluştu
            throw new Error('Failed to fetch products');
        }
    }
}; 