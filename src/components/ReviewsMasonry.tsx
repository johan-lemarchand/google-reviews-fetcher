'use client';

import React from 'react';
import Masonry from 'react-masonry-css';
import { useReviews } from '../hooks/useReviews';

export const ReviewsMasonry: React.FC = () => {
    const { reviews, error } = useReviews();

    // Si pas de reviews ou reviews vides, on ne rend rien
    if (!reviews || reviews.reviews.length === 0) return null;

    const breakpointColumns = {
        default: 3,
        1100: 2,
        700: 1
    };

    return (
        <Masonry
            breakpointCols={breakpointColumns}
            className="reviews-masonry"
            columnClassName="reviews-masonry_column"
        >
            {reviews.reviews.map((review, index) => (
                <div key={index} className="review-card">
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
            ))}
        </Masonry>
    );
};
