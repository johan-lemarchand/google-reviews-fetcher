import { useState, useEffect } from 'react';
import { PlaceDetails } from '../types';

interface ReviewsHookResult {
    reviews: PlaceDetails | null;
    error: boolean;
}

export const useReviews = (jsonPath = '/data/reviews.json'): ReviewsHookResult => {
    const [reviews, setReviews] = useState<PlaceDetails | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const response = await fetch(jsonPath);
                if (!response.ok) {
                    setReviews({
                        totalReviews: 0,
                        rating: 0,
                        reviews: [],
                        lastUpdate: new Date().toISOString()
                    });
                    return;
                }
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                setReviews({
                    totalReviews: 0,
                    rating: 0,
                    reviews: [],
                    lastUpdate: new Date().toISOString()
                });
                setError(true);
            }
        };

        loadReviews();
    }, [jsonPath]);

    return { reviews, error };
};
