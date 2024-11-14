import { fetchGoogleReviews } from './index';
import { shouldUpdate } from './utils/dateCheck';

export async function updateReviews(config: { placeId: string; apiKey: string }) {
    try {
        // Vérifier si une mise à jour est nécessaire
        const needsUpdate = await shouldUpdate();
        
        if (needsUpdate) {
        await fetchGoogleReviews({
            placeId: config.placeId,
            apiKey: config.apiKey,
            language: 'fr',
            limit: 5
        });
        console.log('Reviews updated successfully');
        } else {
        console.log('Reviews are up to date');
        }
    } catch (error) {
        console.error('Failed to update reviews:', error);
    }
}