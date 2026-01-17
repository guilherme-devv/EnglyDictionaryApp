import { StorageService } from './StorageService';
import { STORAGE_KEYS } from '@/src/config';

export class FavoritesStorage {
  static async getFavorites(): Promise<string[]> {
    const favorites = await StorageService.getItem<string[]>(STORAGE_KEYS.FAVORITES);
    return favorites || [];
  }

  static async addFavorite(word: string): Promise<void> {
    const favorites = await this.getFavorites();
    const wordLower = word.toLowerCase();

    if (!favorites.includes(wordLower)) {
      favorites.push(wordLower);
      await StorageService.setItem(STORAGE_KEYS.FAVORITES, favorites);
    }
  }

  static async removeFavorite(word: string): Promise<void> {
    const favorites = await this.getFavorites();
    const wordLower = word.toLowerCase();
    const updated = favorites.filter(f => f !== wordLower);

    await StorageService.setItem(STORAGE_KEYS.FAVORITES, updated);
  }

  static async isFavorite(word: string): Promise<boolean> {
    const favorites = await this.getFavorites();
    return favorites.includes(word.toLowerCase());
  }

  static async clearFavorites(): Promise<void> {
    await StorageService.setItem(STORAGE_KEYS.FAVORITES, []);
  }
}
