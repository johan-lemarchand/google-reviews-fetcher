import fetch from 'node-fetch';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { GoogleReviewsConfig, PlaceDetails } from './types';
import { formatReviews } from './utils/formatters';

interface GooglePlacesResponse {
    result?: {
        reviews: Array<{
            author_name: string;
            rating: number;
            text: string;
            time: number;
            profile_photo_url?: string;
        }>;
        user_ratings_total: number;
        rating: number;
    };
    status: string;
    error_message?: string;
}

export async function fetchGoogleReviews(config: GoogleReviewsConfig): Promise<PlaceDetails> {
    try {
      // Validation de la limite
        if (config.limit && (config.limit < 1 || config.limit > 5)) {
            throw new Error('Limit must be between 1 and 5');
        }
    
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?` +
            `place_id=${config.placeId}` +
            `&fields=reviews,user_ratings_total,rating` +
            `&key=${config.apiKey}` +
            `&language=${config.language || 'fr'}`
        );
    
        const data = await response.json() as GooglePlacesResponse;
    
        if (!data.result) {
            throw new Error(data.error_message || 'No result found');
        }
    
        const reviews = data.result.reviews || [];
        // Applique la limite si spécifiée
        const limitedReviews = config.limit ? reviews.slice(0, config.limit) : reviews;
    
        const formattedData = {
            totalReviews: data.result.user_ratings_total || 0,
            rating: data.result.rating || 0,
            reviews: formatReviews(limitedReviews),
            lastUpdate: new Date().toISOString().split('T')[0]
        };
    
        // Stockage en JSON
        const dataDir = join(process.cwd(), 'data');
        if (!existsSync(dataDir)) {
            await mkdir(dataDir);
        }
    
        await writeFile(
            join(dataDir, 'reviews.json'),
            JSON.stringify(formattedData, null, 2)
        );
    
        return formattedData;
        } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to fetch Google reviews: ${errorMessage}`);
    }
}