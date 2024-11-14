import { updateReviews } from '../../../src/cron';

export async function GET() {
    if (!process.env.GOOGLE_PLACE_ID || !process.env.GOOGLE_API_KEY) {
        return new Response('Missing configuration', { status: 500 });
    }

    try {
        await updateReviews({
        placeId: process.env.GOOGLE_PLACE_ID,
        apiKey: process.env.GOOGLE_API_KEY
        });
        
        return new Response('Reviews updated successfully', { status: 200 });
    } catch (error) {
        return new Response('Failed to update reviews', { status: 500 });
    }
}