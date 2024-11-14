import { GoogleReview, FormattedReview } from '../types';

export function formatReview(review: GoogleReview): FormattedReview {
    return {
        author_name: review.author_name,
        rating: review.rating,
        text: review.text,
        date: new Date(review.time * 1000).toISOString().split('T')[0],
        image: review.profile_photo_url || "/images/default-avatar.jpg"
    };
}

export function formatReviews(reviews: GoogleReview[]): FormattedReview[] {
    return reviews.map(formatReview);
}