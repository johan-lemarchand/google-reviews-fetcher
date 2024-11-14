export interface GoogleReviewsConfig {
    placeId: string;
    apiKey: string;
    language?: string;
    limit?: 1 | 2 | 3 | 4 | 5;
    saveToJson?: {
        enabled: boolean;
        path?: string;
    };
}

// Le reste des interfaces reste identique
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

export interface PlaceDetails {
    totalReviews: number;
    rating: number;
    reviews: FormattedReview[];
    lastUpdate: string;
}