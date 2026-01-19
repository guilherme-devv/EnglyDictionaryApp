import { Alert } from 'react-native';
import { Audio } from 'expo-av';

export class AudioService {
  private static currentSound: Audio.Sound | null = null;
  private static currentAudioUrl: string | null = null;

  static async playAudio(audioUrl: string): Promise<void> {
    try {
      if (this.currentAudioUrl === audioUrl && this.currentSound) {
        return this.stopAudio();
      }

      if (this.currentSound) await this.stopAudio();

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });

      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true },
        this.onPlaybackStatusUpdate
      );

      this.currentSound = sound;
      this.currentAudioUrl = audioUrl;
      await sound.playAsync();
    } catch (error) {
      Alert.alert('Error', 'Failed to play audio');
      this.currentSound = null;
      this.currentAudioUrl = null;
      throw new Error('Failed to play audio');
    }
  }

  static async stopAudio(): Promise<void> {
    if (this.currentSound) {
      try {
        await this.currentSound.stopAsync();
        await this.currentSound.unloadAsync();
      } catch (error) {
        Alert.alert('Error', 'Error stopping audio');
      } finally {
        this.currentSound = null;
        this.currentAudioUrl = null;
      }
    }
  }

  static isPlaying(audioUrl: string): boolean {
    return this.currentAudioUrl === audioUrl && this.currentSound !== null;
  }

  static getCurrentAudioUrl(): string | null {
    return this.currentAudioUrl;
  }

  private static onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded && status.didJustFinish) {
      AudioService.currentSound = null;
      AudioService.currentAudioUrl = null;
    }
  };

  static async cleanup(): Promise<void> {
    await this.stopAudio();
  }
}
