import { Alert } from 'react-native';
import { Word } from '@/src/models';
import { DictionaryAPI } from '@/src/services/api';
import { AudioService } from '@/src/services/audio';
import { homeViewModel } from './HomeViewModel';
import { useFavoritesStore, useHistoryStore } from '@/src/stores';

export interface WordDetailViewState {
  word: string;
  wordData: Word | null;
  loading: boolean;
  error: string | null;
  isFavorite: boolean;
  playingAudioUrl: string | null;
  hasNext: boolean;
  hasPrevious: boolean;
}

type StateListener = (state: WordDetailViewState) => void;

export class WordDetailViewModel {
  private state: WordDetailViewState;
  private listeners = new Set<StateListener>();
  private unsubscribeFromStore?: () => void;

  constructor(word: string) {
    this.state = {
      word,
      wordData: null,
      loading: true,
      error: null,
      isFavorite: false,
      playingAudioUrl: null,
      hasNext: false,
      hasPrevious: false,
    };

    this.initialize();
  }

  private async initialize(): Promise<void> {
    await this.loadWordDetails();
    this.updateNavigationContext();

    this.unsubscribeFromStore = useFavoritesStore.subscribe((store) => {
      const isFavorite = store.isFavorite(this.state.word);
      if (isFavorite !== this.state.isFavorite) {
        this.setState({ isFavorite });
      }
    });

    const isFavorite = useFavoritesStore.getState().isFavorite(this.state.word);
    this.setState({ isFavorite });
  }

  private updateNavigationContext(): void {
    const nextWord = homeViewModel.getNextWord(this.state.word);
    const previousWord = homeViewModel.getPreviousWord(this.state.word);

    this.setState({
      hasNext: !!nextWord,
      hasPrevious: !!previousWord,
    });
  }

  getState(): WordDetailViewState {
    return { ...this.state };
  }

  subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  private setState(updates: Partial<WordDetailViewState>): void {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  async loadWordDetails(): Promise<void> {
    try {
      this.setState({ loading: true, error: null });

      const data = await DictionaryAPI.getWordDetails(this.state.word);
      if (!data?.length) {
        return this.setState({ loading: false, error: 'Word not found' });
      }

      this.setState({ wordData: data[0], loading: false });
      await useHistoryStore.getState().addToHistory(this.state.word);
    } catch (error: any) {
      Alert.alert('Error', 'Failed to load word details');
      this.setState({ loading: false, error: error.message || 'Failed to load word details' });
    }
  }



  async toggleFavorite(): Promise<void> {
    try {
      await useFavoritesStore.getState().toggleFavorite(this.state.word);
    } catch (error) {
      Alert.alert('Error', 'Error toggling favorite');
    }
  }

  async playAudio(audioUrl: string): Promise<void> {
    try {
      const isCurrentlyPlaying = this.state.playingAudioUrl === audioUrl;

      if (isCurrentlyPlaying) {
        await AudioService.stopAudio();
      } else {
        await AudioService.playAudio(audioUrl);
      }

      this.setState({ playingAudioUrl: isCurrentlyPlaying ? null : audioUrl });

      if (!isCurrentlyPlaying) {
        setTimeout(() => {
          if (this.state.playingAudioUrl === audioUrl) {
            this.setState({ playingAudioUrl: null });
          }
        }, 5000);
      }
    } catch (error) {
      Alert.alert('Error', 'Error playing audio');
      this.setState({ playingAudioUrl: null });
    }
  }

  async retry(): Promise<void> {
    await this.loadWordDetails();
  }

  async navigateToNext(): Promise<string | null> {
    const nextWord = homeViewModel.getNextWord(this.state.word);
    if (nextWord) {
      await this.setWord(nextWord);
    }
    return nextWord;
  }

  async navigateToPrevious(): Promise<string | null> {
    const previousWord = homeViewModel.getPreviousWord(this.state.word);
    if (previousWord) {
      await this.setWord(previousWord);
    }
    return previousWord;
  }

  private async setWord(word: string): Promise<void> {
    this.setState({ word, wordData: null, loading: true, error: null });
    await this.loadWordDetails();
    this.updateNavigationContext();
    const isFavorite = useFavoritesStore.getState().isFavorite(word);
    this.setState({ isFavorite });
  }

  async cleanup(): Promise<void> {
    await AudioService.cleanup();
    if (this.unsubscribeFromStore) {
      this.unsubscribeFromStore();
    }
  }
}
