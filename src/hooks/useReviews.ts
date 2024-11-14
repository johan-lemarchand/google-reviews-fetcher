import { useState, useEffect } from 'react';
import { PlaceDetails } from '../types';

export const useReviews = (jsonPath = 'data/reviews.json') => {
    const [reviews, setReviews] = useState<PlaceDetails | null>(null);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const response = await fetch(jsonPath);
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Erreur lors du chargement des avis:', error);
            }
        };

        loadReviews();
    }, [jsonPath]);

    return reviews;
};
