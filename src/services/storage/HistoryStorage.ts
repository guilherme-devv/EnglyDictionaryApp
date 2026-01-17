import { StorageService } from './StorageService';
import { STORAGE_KEYS, CACHE_CONFIG } from '@/src/config';

interface HistoryItem {
  word: string;
  timestamp: number;
}

export class HistoryStorage {
  static async getHistory(): Promise<string[]> {
    const items = await StorageService.getItem<HistoryItem[]>(STORAGE_KEYS.HISTORY);
    if (!items) return [];

    return items
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(item => item.word);
  }

  static async addToHistory(word: string): Promise<void> {
    const items = await StorageService.getItem<HistoryItem[]>(STORAGE_KEYS.HISTORY) || [];
    const wordLower = word.toLowerCase();

    const filtered = items.filter(item => item.word !== wordLower);

    filtered.unshift({
      word: wordLower,
      timestamp: Date.now(),
    });

    const limited = filtered.slice(0, CACHE_CONFIG.MAX_HISTORY_ITEMS);

    await StorageService.setItem(STORAGE_KEYS.HISTORY, limited);
  }

  static async clearHistory(): Promise<void> {
    await StorageService.setItem(STORAGE_KEYS.HISTORY, []);
  }

  static async removeFromHistory(word: string): Promise<void> {
    const items = await StorageService.getItem<HistoryItem[]>(STORAGE_KEYS.HISTORY) || [];
    const wordLower = word.toLowerCase();
    const filtered = items.filter(item => item.word !== wordLower);

    await StorageService.setItem(STORAGE_KEYS.HISTORY, filtered);
  }
}
