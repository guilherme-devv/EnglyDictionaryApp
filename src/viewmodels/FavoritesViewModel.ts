import { useFavoritesStore } from '@/src/stores';

export interface FavoritesViewState {
  favorites: string[];
  loading: boolean;
  refreshing: boolean;
}

type StateListener = (state: FavoritesViewState) => void;

export class FavoritesViewModel {
  private state: FavoritesViewState = {
    favorites: [],
    loading: true,
    refreshing: false,
  };

  private listeners = new Set<StateListener>();
  private unsubscribeFromStore: () => void;

  constructor() {
    this.unsubscribeFromStore = useFavoritesStore.subscribe((store) => {
      this.setState({ favorites: store.favorites, loading: store.isLoading });
    });

    const store = useFavoritesStore.getState();
    this.state.favorites = store.favorites;
    this.state.loading = store.isLoading;

    if (store.favorites.length === 0 && !store.isLoading) {
      store.loadFavorites();
    }
  }

  getState(): FavoritesViewState {
    return { ...this.state };
  }

  subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  private setState(updates: Partial<FavoritesViewState>): void {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  async loadFavorites(): Promise<void> {
    await useFavoritesStore.getState().loadFavorites();
  }

  async refresh(): Promise<void> {
    try {
      this.setState({ refreshing: true });
      await this.loadFavorites();
    } finally {
      this.setState({ refreshing: false });
    }
  }

  async removeFavorite(word: string): Promise<void> {
    await useFavoritesStore.getState().removeFavorite(word);
  }

  async clearAll(): Promise<void> {
    const favorites = [...this.state.favorites];
    for (const word of favorites) {
      await useFavoritesStore.getState().removeFavorite(word);
    }
  }

  isEmpty(): boolean {
    return this.state.favorites.length === 0;
  }

  cleanup(): void {
    this.unsubscribeFromStore();
  }
}
