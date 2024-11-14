import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

export async function shouldUpdate(): Promise<boolean> {
    const dataDir = join(process.cwd(), 'data');
    const filePath = join(dataDir, 'reviews.json');

  // Si le fichier n'existe pas, mise à jour nécessaire
    if (!existsSync(filePath)) {
        return true;
    }

    try {
        const fileContent = await readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

    // Vérifier si la dernière mise à jour date d'aujourd'hui
        const lastUpdate = new Date(data.lastUpdate);
        const today = new Date();

        return lastUpdate.toDateString() !== today.toDateString();
    } catch (error) {
    // En cas d'erreur, on force la mise à jour
    return true;
    }
}