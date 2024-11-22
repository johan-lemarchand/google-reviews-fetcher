// Logique de formatage (client)
export interface GoogleReview {
    author_name: string;
    rating: number;
    text: string;
    time: number;
    profile_photo_url?: string;
}

export interface FormattedReview {
    author_name: string;
    rating: number;
    text: string;
    date: string;
    image: string;
}

export interface GooglePlacesResponse {
    result?: {
        reviews: GoogleReview[];
        user_ratings_total: number;
        rating: number;
    };
    status: string;
    error_message?: string;
}

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