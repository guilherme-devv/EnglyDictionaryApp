import { Alert } from 'react-native';
import { createAudioPlayer, AudioPlayer } from 'expo-audio';

export class AudioService {
  private static currentPlayer: AudioPlayer | null = null;
  private static currentAudioUrl: string | null = null;

  static async playAudio(audioUrl: string): Promise<void> {
    try {
      if (this.currentAudioUrl === audioUrl && this.currentPlayer) {
        if (this.currentPlayer.playing) {
          return this.stopAudio();
        } else {
          this.currentPlayer.play();
          return;
        }
      }

      if (this.currentPlayer) await this.stopAudio();

      const player = createAudioPlayer(audioUrl);

      this.currentPlayer = player;
      this.currentAudioUrl = audioUrl;

      player.addListener('playbackStatusUpdate', (status) => {
        if (status.didJustFinish) {
          this.cleanup();
        }
      });

      player.play();
    } catch (error) {
      Alert.alert('Error', 'Failed to play audio');
      this.currentPlayer = null;
      this.currentAudioUrl = null;
      throw new Error('Failed to play audio');
    }
  }

  static async stopAudio(): Promise<void> {
    if (this.currentPlayer) {
      try {
        this.currentPlayer.pause();
        
      } catch (error) {
        Alert.alert('Error', 'Error stopping audio');
      } finally {
        this.currentPlayer = null;
        this.currentAudioUrl = null;
      }
    }
  }

  static isPlaying(audioUrl: string): boolean {
    return this.currentAudioUrl === audioUrl && this.currentPlayer !== null && this.currentPlayer.playing;
  }

  static getCurrentAudioUrl(): string | null {
    return this.currentAudioUrl;
  }

  static cleanup(): void {
    if (this.currentPlayer) {
      this.currentPlayer.pause();
      this.currentPlayer = null;
    }
    this.currentAudioUrl = null;
  }
}
