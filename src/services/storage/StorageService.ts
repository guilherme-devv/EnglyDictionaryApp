import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch {
      Alert.alert('Error', `Error getting item ${key}`);
      return null;
    }
  }

  static async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch {
      Alert.alert('Error', `Error setting item ${key}`);
      throw new Error('Error setting item');
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      Alert.alert('Error', `Error removing item ${key}`);
      throw new Error('Error removing item');
    }
  }

  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch {
      Alert.alert('Error', 'Error clearing storage');
      throw new Error('Error clearing storage');
    }
  }

  static async multiGet(keys: string[]): Promise<Record<string, any>> {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      return pairs.reduce((acc, [key, value]) => {
        if (!value) return acc;
        try {
          acc[key] = JSON.parse(value);
        } catch {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);
    } catch {
      Alert.alert('Error', 'Error getting multiple items');
      return {};
    }
  }
}
