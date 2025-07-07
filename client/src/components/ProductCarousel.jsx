import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/carousel.css';

const ProductCarousel = ({ products }) => {
    return (
        <div className="relative">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                breakpoints={{
                    // Mobile - 1 slide
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    // Tablet - 2 slides
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    // Desktop - 3 slides
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                }}
                className="product-swiper"
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <div className="p-2">
                            <ProductCard product={product} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductCarousel; 