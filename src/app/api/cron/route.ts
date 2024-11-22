import { join } from 'path';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

async function shouldUpdate(): Promise<boolean> {
    try {
        const filePath = join(process.cwd(), 'public', 'data', 'reviews.json');

        // Si le fichier n'existe pas, une mise à jour est nécessaire
        if (!existsSync(filePath)) {
            return true;
        }

        const fileContent = await readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        // Vérifier si la dernière mise à jour date d'aujourd'hui
        const lastUpdate = new Date(data.lastUpdate);
        const today = new Date();

        return lastUpdate.toDateString() !== today.toDateString();
    } catch {
        // En cas d'erreur, on force une mise à jour
        return true;
    }
}

export async function GET() {
    try {
        const needsUpdate = await shouldUpdate();

        if (needsUpdate) {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            const response = await fetch(`${baseUrl}/api/reviews`);

            if (!response.ok) {
                throw new Error('Failed to update reviews');
            }

            return Response.json({
                message: 'Reviews updated successfully',
                timestamp: new Date().toISOString()
            });
        }

        return Response.json({
            message: 'Reviews are up to date',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Cron job error:', error);
        return Response.json({
            error: 'Failed to update reviews',
            timestamp: new Date().toISOString()
        }, {
            status: 500
        });
    }
}
