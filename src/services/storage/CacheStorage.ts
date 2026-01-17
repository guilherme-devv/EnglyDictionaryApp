import { StorageService } from './StorageService';
import { STORAGE_KEYS, CACHE_CONFIG } from '@/src/config';

interface CachedData<T> {
  data: T;
  timestamp: number;
}

export class CacheStorage {
  static async get<T>(key: string): Promise<T | null> {
    const cached = await StorageService.getItem<CachedData<T>>(key);

    if (!cached) return null;

    const now = Date.now();
    const expiryTime = CACHE_CONFIG.EXPIRY_DAYS * 24 * 60 * 60 * 1000;

    if (now - cached.timestamp > expiryTime) {
      await StorageService.removeItem(key);
      return null;
    }

    return cached.data;
  }

  static async set<T>(key: string, data: T): Promise<void> {
    const cachedData: CachedData<T> = {
      data,
      timestamp: Date.now(),
    };

    await StorageService.setItem(key, cachedData);
  }

  static async remove(key: string): Promise<void> {
    await StorageService.removeItem(key);
  }

  static async clearWithPrefix(prefix: string): Promise<void> {
  }

  static async getWordsList(): Promise<string[] | null> {
    return await StorageService.getItem<string[]>(STORAGE_KEYS.WORDS_CACHE);
  }

  static async setWordsList(words: string[]): Promise<void> {
    await StorageService.setItem(STORAGE_KEYS.WORDS_CACHE, words);
  }

  static async getWordDetails<T>(word: string): Promise<T | null> {
    const key = `${STORAGE_KEYS.CACHE_PREFIX}${word.toLowerCase()}`;
    return await this.get<T>(key);
  }

  static async setWordDetails<T>(word: string, data: T): Promise<void> {
    const key = `${STORAGE_KEYS.CACHE_PREFIX}${word.toLowerCase()}`;
    await this.set(key, data);
  }
}
