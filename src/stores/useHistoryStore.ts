import { create } from 'zustand';
import { HistoryStorage } from '../services/storage/HistoryStorage';

interface HistoryState {
  history: string[];
  isLoading: boolean;
  loadHistory: () => Promise<void>;
  addToHistory: (word: string) => Promise<void>;
  removeFromHistory: (word: string) => Promise<void>;
  clearHistory: () => Promise<void>;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  history: [],
  isLoading: false,

  loadHistory: async () => {
    set({ isLoading: true });
    try {
      const history = await HistoryStorage.getHistory();
      set({ history, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  addToHistory: async (word: string) => {
    const wordLower = word.toLowerCase();
    await HistoryStorage.addToHistory(wordLower);

    // Optimistic update: move to top or add to top
    set((state) => {
      const filtered = state.history.filter((w) => w !== wordLower);
      return { history: [wordLower, ...filtered] };
    });
  },

  removeFromHistory: async (word: string) => {
    const wordLower = word.toLowerCase();
    await HistoryStorage.removeFromHistory(wordLower);
    set((state) => ({
      history: state.history.filter((w) => w !== wordLower),
    }));
  },

  clearHistory: async () => {
    await HistoryStorage.clearHistory();
    set({ history: [] });
  },
}));
