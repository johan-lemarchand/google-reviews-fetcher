'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useReviews } from '../hooks/useReviews';

export const ReviewsSwiper: React.FC<{ jsonPath?: string }> = ({
                                                                   jsonPath = '/data/reviews.json'
                                                               }) => {
    const { reviews, error } = useReviews(jsonPath);

    if (!reviews || reviews.reviews.length === 0) return null;

    return (
        <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 }
            }}
            pagination={{ clickable: true }}
        >
            {reviews.reviews.map((review, index) => (
                <SwiperSlide key={index}>
                    <div className="review-card">
                        <div className="review-header">
                            <img
                                src={review.image}
                                alt={review.author_name}
                                className="review-avatar"
                            />
                            <div>
                                <h4>{review.author_name}</h4>
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <i
                                            key={i}
                                            className={`star ${i < review.rating ? 'active' : ''}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="review-text">{review.text}</p>
                        <span className="review-date">{review.date}</span>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
