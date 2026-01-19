import { useHistoryStore } from '@/src/stores';

export interface HistoryViewState {
  history: string[];
  loading: boolean;
  refreshing: boolean;
}

type StateListener = (state: HistoryViewState) => void;

export class HistoryViewModel {
  private state: HistoryViewState = {
    history: [],
    loading: true,
    refreshing: false,
  };

  private listeners = new Set<StateListener>();
  private unsubscribeFromStore: () => void;

  constructor() {
    this.unsubscribeFromStore = useHistoryStore.subscribe((store) => {
      this.setState({ history: store.history, loading: store.isLoading });
    });

    const store = useHistoryStore.getState();
    this.state.history = store.history;
    this.state.loading = store.isLoading;

    if (store.history.length === 0 && !store.isLoading) {
      store.loadHistory();
    }
  }

  getState(): HistoryViewState {
    return { ...this.state };
  }

  subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  private setState(updates: Partial<HistoryViewState>): void {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  async loadHistory(): Promise<void> {
    await useHistoryStore.getState().loadHistory();
  }

  async refresh(): Promise<void> {
    try {
      this.setState({ refreshing: true });
      await this.loadHistory();
    } finally {
      this.setState({ refreshing: false });
    }
  }

  async removeFromHistory(word: string): Promise<void> {
    await useHistoryStore.getState().removeFromHistory(word);
  }

  async clearAll(): Promise<void> {
    await useHistoryStore.getState().clearHistory();
  }

  isEmpty(): boolean {
    return this.state.history.length === 0;
  }

  cleanup(): void {
    this.unsubscribeFromStore();
  }
}
