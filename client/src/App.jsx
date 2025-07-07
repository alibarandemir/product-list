import React, { useState, useEffect } from 'react';
import { fetchProducts } from './services/api';
import ProductCarousel from './components/ProductCarousel';
import ProductFilters from './components/ProductFilters';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilters, setCurrentFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minScore: '',
    maxScore: ''
  });

  const getProducts = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await fetchProducts(filters);
      if (response.success) {
        setProducts(response.data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
    getProducts(filters);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-montserrat font-bold text-center mb-8">Product List</h1>
      <ProductFilters 
        onFilterChange={handleFilterChange} 
        currentFilters={currentFilters}
      />
      <div className="max-w-6xl mx-auto">
        {products.length > 0 ? (
          <ProductCarousel products={products} />
        ) : (
          <div className="text-center text-gray-500 text-xl">
            No products found with the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
