'use client';

import React from 'react';
import { useReviews } from '../hooks/useReviews';
import { FormattedReview } from '../types';

interface ReviewsCustomProps {
    renderReview?: (review: FormattedReview) => React.ReactNode;
    containerClassName?: string;
}

export const ReviewsCustom: React.FC<ReviewsCustomProps> = ({
                                                                renderReview,
                                                                containerClassName = 'reviews-container'
                                                            }) => {
    const { reviews, error } = useReviews();

    // Si pas de reviews ou reviews vides, on ne rend rien
    if (!reviews || reviews.reviews.length === 0) return null;

    // Composant par défaut si renderReview n'est pas fourni
    const defaultReviewRender = (review: FormattedReview) => (
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
    );

    return (
        <div className={containerClassName}>
            {reviews.reviews.map((review, index) => (
                <div key={index}>
                    {renderReview ? renderReview(review) : defaultReviewRender(review)}
                </div>
            ))}
        </div>
    );
};
