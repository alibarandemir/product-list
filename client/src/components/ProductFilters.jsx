import React, { useState, useEffect } from 'react';

const ProductFilters = ({ onFilterChange, currentFilters }) => {
    const [filters, setFilters] = useState(currentFilters);

    // currentFilters prop'u değiştiğinde state'i güncelle
    useEffect(() => {
        setFilters(currentFilters);
    }, [currentFilters]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
    };

    const handleSubmit = () => {
        // Boş olmayan değerleri filtrele
        const validFilters = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== '') {
                acc[key] = value;
            }
            return acc;
        }, {});

        // Filtreleri uygula
        onFilterChange(filters);
    };

    const handleReset = () => {
        const resetFilters = {
            minPrice: '',
            maxPrice: '',
            minScore: '',
            maxScore: ''
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Min Price ($)
                    </label>
                    <input
                        type="number"
                        id="minPrice"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Min price"
                        min="0"
                        step="0.01"
                    />
                </div>

                <div>
                    <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Max Price ($)
                    </label>
                    <input
                        type="number"
                        id="maxPrice"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Max price"
                        min="0"
                        step="0.01"
                    />
                </div>

                <div>
                    <label htmlFor="minScore" className="block text-sm font-medium text-gray-700 mb-1">
                        Min Rating
                    </label>
                    <input
                        type="number"
                        id="minScore"
                        name="minScore"
                        value={filters.minScore}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Min rating"
                        min="0"
                        max="5"
                        step="0.1"
                    />
                </div>

                <div>
                    <label htmlFor="maxScore" className="block text-sm font-medium text-gray-700 mb-1">
                        Max Rating
                    </label>
                    <input
                        type="number"
                        id="maxScore"
                        name="maxScore"
                        value={filters.maxScore}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Max rating"
                        min="0"
                        max="5"
                        step="0.1"
                    />
                </div>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
                <button
                    onClick={handleReset}
                    type="button"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Reset Filters
                </button>
                <button
                    onClick={handleSubmit}
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default ProductFilters; 