'use client';
import './styles/index.css';

export { ReviewsSwiper } from './components/ReviewsSwiper';
export { ReviewsMasonry } from './components/ReviewsMasonry';
export { ReviewsCustom } from './components/ReviewsCustom';
export { GoogleReviewsButton } from './components/GoogleReviewsButton';
export { useReviews } from './hooks/useReviews';

export type {
    PlaceDetails,
    FormattedReview,
    GoogleReview,
    GoogleReviewsConfig
} from './types';
