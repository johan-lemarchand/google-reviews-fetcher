import React from 'react';
import { PlaceDetails } from '../types';

interface GoogleReviewsButtonProps {
    placeId: string;
    reviews: PlaceDetails;
}

export const GoogleReviewsButton: React.FC<GoogleReviewsButtonProps> = ({ placeId, reviews }) => {
    return (
        <a 
        href={`https://search.google.com/local/reviews?placeid=${placeId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="google-reviews-button"
        >
        <div className="button-content">
            <i className="google-icon" />
            <div className="button-text">
            <span>Voir tous nos avis Google</span>
            <div className="rating-info">
                <div className="stars">
                {[...Array(5)].map((_, i) => (
                    <i 
                    key={i} 
                    className={`star ${i < Math.round(reviews.rating) ? 'active' : ''}`}
                    />
                ))}
                </div>
                <span>({reviews.totalReviews} avis)</span>
            </div>
            </div>
        </div>
        </a>
    );
};