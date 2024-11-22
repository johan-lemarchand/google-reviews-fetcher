'use client';

import React from 'react';
import { useReviews } from '../hooks/useReviews';
import { FaStar, FaGoogle } from 'react-icons/fa';

interface GoogleReviewsButtonProps {
    placeId: string;
}

export const GoogleReviewsButton: React.FC<GoogleReviewsButtonProps> = ({ placeId }) => {
    const { reviews } = useReviews();

    if (!reviews) {
        return (
            <a
                href={`https://search.google.com/local/reviews?placeid=${placeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="google-reviews-button"
            >
                <div className="button-content">
                    <FaGoogle className="google-icon" />
                    <span className="button-text">Voir nos avis Google</span>
                </div>
            </a>
        );
    }

    return (
        <a
            href={`https://search.google.com/local/reviews?placeid=${placeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="google-reviews-button"
        >
            <div className="button-content">
                <FaGoogle className="google-icon" />
                <div className="button-text">
                    <span>Voir tous nos avis Google</span>
                    <div className="rating-info">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={`star ${i < Math.round(reviews.rating) ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                        <span className="reviews-count">({reviews.totalReviews} avis)</span>
                    </div>
                </div>
            </div>
        </a>
    );
};