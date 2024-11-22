'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useReviews } from '../hooks/useReviews';
import { FaStar } from 'react-icons/fa';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
};

export const ReviewsSwiper: React.FC = () => {
    const { reviews, error } = useReviews();

    if (!reviews || reviews.reviews.length === 0) return null;

    return (
        <div className="reviews-swiper-container">
            <Swiper
                modules={[Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 }
                }}
                pagination={{ clickable: true }}
                className="reviews-swiper"
            >
                {reviews.reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <article className="review-card">
                            <header className="review-header">
                                <img
                                    src={review.image}
                                    alt={review.author_name}
                                    className="review-avatar"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + review.author_name;
                                    }}
                                />
                                <div className="review-author">
                                    <h4 className="author-name">{review.author_name}</h4>
                                    <div className="stars">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`star ${i < review.rating ? 'active' : ''}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </header>
                            <p className="review-text">{review.text}</p>
                            <footer className="review-footer">
                                <time className="review-date">{formatDate(review.date)}</time>
                            </footer>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};