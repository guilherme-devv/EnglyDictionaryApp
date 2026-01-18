import { Alert } from 'react-native';
import { DictionaryAPI } from '@/src/services/api';
import { PAGINATION_CONFIG } from '@/src/config';

export interface HomeViewState {
  allWords: string[];
  displayedWords: string[];
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
  searchQuery: string;
  page: number;
  error: string | null;
}

type StateListener = (state: HomeViewState) => void;

export class HomeViewModel {
  private state: HomeViewState = {
    allWords: [],
    displayedWords: [],
    loading: true,
    loadingMore: false,
    refreshing: false,
    searchQuery: '',
    page: 0,
    error: null,
  };

  private listeners = new Set<StateListener>();

  constructor() {
    this.loadWords();
  }

  getState(): HomeViewState {
    return { ...this.state };
  }

  subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  private setState(updates: Partial<HomeViewState>): void {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  async loadWords(): Promise<void> {
    try {
      this.setState({ loading: true, error: null });

      const words = await DictionaryAPI.loadWordsList();

      this.setState({
        allWords: words,
        displayedWords: words.slice(0, PAGINATION_CONFIG.ITEMS_PER_PAGE),
        page: 1,
        loading: false,
      });
    } catch (error: any) {
      Alert.alert('Error', 'Failed to load words');
      this.setState({
        loading: false,
        error: error.message || 'Failed to load words',
      });
    }
  }

  async refresh(): Promise<void> {
    try {
      this.setState({ refreshing: true, error: null });
      await this.loadWords();
    } finally {
      this.setState({ refreshing: false });
    }
  }

  setSearchQuery(query: string): void {
    this.setState({ searchQuery: query });

    const filteredWords = this.getFilteredWords(query);
    this.setState({
      displayedWords: filteredWords.slice(0, PAGINATION_CONFIG.ITEMS_PER_PAGE),
      page: 1,
    });
  }

  clearSearch(): void {
    this.setSearchQuery('');
  }

  getFilteredWords(query: string): string[] {
    const trimmed = query.trim().toLowerCase();
    return trimmed
      ? this.state.allWords.filter(word => word.toLowerCase().includes(trimmed))
      : this.state.allWords;
  }

  getNextWord(currentWord: string): string | null {
    const words = this.getFilteredWords(this.state.searchQuery);
    const index = words.indexOf(currentWord.toLowerCase());
    if (index === -1 || index === words.length - 1) return null;
    return words[index + 1];
  }

  getPreviousWord(currentWord: string): string | null {
    const words = this.getFilteredWords(this.state.searchQuery);
    const index = words.indexOf(currentWord.toLowerCase());
    if (index === -1 || index === 0) return null;
    return words[index - 1];
  }

  loadMore(): void {
    const { loadingMore, displayedWords, searchQuery, page } = this.state;
    const sourceWords = this.getFilteredWords(searchQuery);

    if (loadingMore || displayedWords.length >= sourceWords.length) return;

    this.setState({ loadingMore: true });

    const nextPage = page + 1;
    const end = nextPage * PAGINATION_CONFIG.ITEMS_PER_PAGE;

    this.setState({
      displayedWords: sourceWords.slice(0, end),
      page: nextPage,
      loadingMore: false,
    });
  }

  getFilteredWordsCount(): number {
    return this.getFilteredWords(this.state.searchQuery).length;
  }

  getTotalWordsCount(): number {
    return this.state.allWords.length;
  }
}

export const homeViewModel = new HomeViewModel();
