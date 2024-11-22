'use client';

import { useState, useEffect } from 'react';
import { PlaceDetails } from '../types';

interface ReviewsHookResult {
    reviews: PlaceDetails | null;
    error: boolean;
}

export const useReviews = (): ReviewsHookResult => {
    const [reviews, setReviews] = useState<PlaceDetails | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const response = await fetch('/api/reviews');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                setError(true);
                console.error('Error loading reviews:', error);
            }
        };

        loadReviews();
    }, []);

    return { reviews, error };
};
