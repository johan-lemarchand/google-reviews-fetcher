import React from 'react';
import { PlaceDetails } from '../types';

interface ReviewsCustomProps {
    reviews: PlaceDetails;
    renderReview?: (review: {
    author_name: string;
    rating: number;
    text: string;
    date: string;
    image: string;
    }) => React.ReactNode;
    containerClassName?: string;
}

export const ReviewsCustom: React.FC<ReviewsCustomProps> = ({ 
    reviews, 
    renderReview,
    containerClassName = 'reviews-container'
}) => {
  // Composant par défaut si renderReview n'est pas fourni
    const defaultReviewRender = (review: any) => (
        <div className="review-card">
        <div className="review-header">
            <img src={review.image} alt={review.author_name} />
            <div>
            <h4>{review.author_name}</h4>
            <div className="stars">
                {[...Array(5)].map((_, i) => (
                <i key={i} className={`star ${i < review.rating ? 'active' : ''}`} />
                ))}
            </div>
            </div>
        </div>
        <p>{review.text}</p>
        <span>{review.date}</span>
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