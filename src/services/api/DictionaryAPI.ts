import { Alert } from 'react-native';
import { apiClient } from '@/src/config/api';
import { API_CONFIG } from '@/src/config';
import { Word } from '@/src/models';
import { CacheStorage } from '../storage';

export class DictionaryAPI {
  static async getWordDetails(word: string): Promise<Word[]> {
    try {
      const cached = await CacheStorage.getWordDetails<Word[]>(word);
      if (cached) return cached;

      const { data } = await apiClient.get<Word[]>(`${API_CONFIG.BASE_URL}/${word.toLowerCase()}`);
      await CacheStorage.setWordDetails(word, data);
      return data;
    } catch (error: any) {
      const apiError = error.response?.data;
      if (apiError?.title) {
        const fullMessage = `${apiError.title}: ${apiError.message}${apiError.resolution ? `\n\n${apiError.resolution}` : ''}`;
        throw new Error(fullMessage);
      }

      const status = error.response?.status;
      if (status === 404) throw new Error(`Word "${word}" not found in dictionary`);

      const message = error.message?.includes('Network')
        ? 'Network error. Please check your connection.'
        : 'Failed to load word details. Please try again.';
      throw new Error(message);
    }
  }

  static async loadWordsList(): Promise<string[]> {
    try {
      const cached = await CacheStorage.getWordsList();
      if (cached) return cached;

      const { data } = await apiClient.get<Record<string, number>>(API_CONFIG.WORDS_URL);
      const wordsList = Object.keys(data).sort();
      await CacheStorage.setWordsList(wordsList);
      return wordsList;
    } catch (error) {
      Alert.alert('Error', 'Error loading words list');
      try {
        return Object.keys(require('@/assets/words.json')).sort();
      } catch {
        Alert.alert('Error', 'Error loading fallback words');
        throw new Error('Failed to load words list');
      }
    }
  }
}
