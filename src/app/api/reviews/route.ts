import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

// Types
interface GoogleReview {
    author_name: string;
    rating: number;
    text: string;
    time: number;
    profile_photo_url?: string;
}

interface FormattedReview {
    author_name: string;
    rating: number;
    text: string;
    date: string;
    image: string;
}

interface GooglePlacesResponse {
    result?: {
        reviews: GoogleReview[];
        user_ratings_total: number;
        rating: number;
    };
    status: string;
    error_message?: string;
}

// Fonctions de formatage
function formatReview(review: GoogleReview): FormattedReview {
    return {
        author_name: review.author_name,
        rating: review.rating,
        text: review.text,
        date: new Date(review.time * 1000).toISOString().split('T')[0],
        image: review.profile_photo_url || "/images/default-avatar.jpg"
    };
}

function formatReviews(reviews: GoogleReview[]): FormattedReview[] {
    return reviews.map(formatReview);
}

export async function GET() {
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?` +
            `place_id=${process.env.GOOGLE_PLACE_ID}` +
            `&fields=reviews,user_ratings_total,rating` +
            `&key=${process.env.GOOGLE_API_KEY}` +
            `&language=fr`
        );

        const data = await response.json() as GooglePlacesResponse;

        if (!data.result) {
            throw new Error(data.error_message || 'No result found');
        }

        const reviews = data.result.reviews || [];
        const limitedReviews = reviews.slice(0, 5); // Limite à 5 avis

        const formattedData = {
            totalReviews: data.result.user_ratings_total || 0,
            rating: data.result.rating || 0,
            reviews: formatReviews(limitedReviews),
            lastUpdate: new Date().toISOString().split('T')[0]
        };

        // Stockage en JSON dans le dossier public
        const dataDir = join(process.cwd(), 'public', 'data');
        if (!existsSync(dataDir)) {
            await mkdir(dataDir, { recursive: true });
        }

        await writeFile(
            join(dataDir, 'reviews.json'),
            JSON.stringify(formattedData, null, 2)
        );

        return Response.json(formattedData);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return Response.json({
            totalReviews: 0,
            rating: 0,
            reviews: [],
            lastUpdate: new Date().toISOString()
        });
    }
}
