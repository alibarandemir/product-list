import React, { useState } from 'react';

const ProductCard = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState('yellow');
    const colors = {
        yellow: { name: 'Yellow Gold', hex: '#E6CA97' },
        white: { name: 'White Gold', hex: '#D9D9D9' },
        rose: { name: 'Rose Gold', hex: '#E1A4A9' }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`text-lg ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative aspect-square">
                <img 
                    src={product.images[selectedColor]} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>
            
            <div className="p-4">
                <h2 className="font-montserrat text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700 text-lg mb-2">{formatPrice(product.price)}</p>
                
                <div className="flex items-center mb-4">
                    {renderStars(product.popularityOutOf5)}
                    <span className="ml-2 text-gray-600">{product.popularityOutOf5}/5</span>
                </div>

                <div className="flex gap-2 mb-4">
                    {Object.entries(colors).map(([color, details]) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                            style={{ backgroundColor: details.hex }}
                            title={details.name}
                        />
                    ))}
                </div>

                <div className="text-sm text-gray-600">
                    Weight: {product.weight}g
                </div>
            </div>
        </div>
    );
};

export default ProductCard; 