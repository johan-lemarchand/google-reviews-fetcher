'use client';
import './styles/index.css';

// Exports côté client uniquement
export { ReviewsSwiper } from './components/ReviewsSwiper';
export { ReviewsMasonry } from './components/ReviewsMasonry';
export { ReviewsCustom } from './components/ReviewsCustom';
export { GoogleReviewsButton } from './components/GoogleReviewsButton';
export { useReviews } from './hooks/useReviews';
export { 
    formatReview,
    formatReviews
} from './utils/formatters';
export type {
    PlaceDetails,
    GoogleReview,
    GoogleReviewsConfig
} from './types';