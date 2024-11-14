import fetch from 'node-fetch';
import { GoogleReviewsConfig, PlaceDetails } from './types';
import { formatReviews } from './utils/formatters';

export async function fetchGoogleReviews(config: GoogleReviewsConfig): Promise<PlaceDetails> {
    try {
        const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?` +
        `place_id=${config.placeId}` +
        `&fields=reviews,user_ratings_total,rating` +
        `&key=${config.apiKey}` +
        `&language=${config.language || 'fr'}`
        );

        const data = await response.json() as {
            result?: {
                reviews?: any[];
                user_ratings_total?: number;
                rating?: number;
            }
        };

        if (!data.result) {
        throw new Error('No result found');
        }

        const reviews = data.result.reviews || [];
        const limitedReviews = config.limit ? reviews.slice(0, config.limit) : reviews;

        return {
        totalReviews: data.result.user_ratings_total || 0,
        rating: data.result.rating || 0,
        reviews: formatReviews(limitedReviews),
        lastUpdate: new Date().toISOString().split('T')[0]
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to fetch Google reviews: ${errorMessage}`);
    }
}