import { create } from 'zustand';
import { FavoritesStorage } from '../services/storage/FavoritesStorage';

interface FavoritesState {
  favorites: string[];
  isLoading: boolean;
  loadFavorites: () => Promise<void>;
  addFavorite: (word: string) => Promise<void>;
  removeFavorite: (word: string) => Promise<void>;
  toggleFavorite: (word: string) => Promise<void>;
  isFavorite: (word: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  isLoading: false,

  loadFavorites: async () => {
    set({ isLoading: true });
    try {
      const favorites = await FavoritesStorage.getFavorites();
      set({ favorites, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  addFavorite: async (word: string) => {
    const wordLower = word.toLowerCase();
    if (get().favorites.includes(wordLower)) return;

    await FavoritesStorage.addFavorite(wordLower);
    set((state) => ({ favorites: [...state.favorites, wordLower] }));
  },

  removeFavorite: async (word: string) => {
    const wordLower = word.toLowerCase();
    await FavoritesStorage.removeFavorite(wordLower);
    set((state) => ({
      favorites: state.favorites.filter((f) => f !== wordLower),
    }));
  },

  toggleFavorite: async (word: string) => {
    const wordLower = word.toLowerCase();
    if (get().isFavorite(wordLower)) {
      await get().removeFavorite(wordLower);
    } else {
      await get().addFavorite(wordLower);
    }
  },

  isFavorite: (word: string) => {
    return get().favorites.includes(word.toLowerCase());
  },
}));
