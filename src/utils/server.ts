import { writeFile } from 'fs/promises';
import type { PlaceDetails, GooglePlacesResponse, GoogleReview } from '../types';

export type { GooglePlacesResponse };

function formatReview(review: GoogleReview) {
    return {
        author_name: review.author_name,
        rating: review.rating,
        text: review.text,
        date: new Date(review.time * 1000).toISOString().split('T')[0],
        image: review.profile_photo_url || "/images/default-avatar.jpg"
    };
}

export function formatReviews(reviews: GoogleReview[]) {
    return reviews.map(formatReview);
}

export async function saveReviewsToTmp(data: PlaceDetails) {
    const reviewsPath = '/tmp/reviews.json';
    await writeFile(reviewsPath, JSON.stringify(data, null, 2));
}