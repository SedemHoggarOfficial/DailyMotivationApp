import AsyncStorage from '@react-native-async-storage/async-storage';
import Quote from '../models/Quote';

const CACHE_KEY = 'CACHED_QUOTE';

export const QuoteCache = {
  async save(quote: Quote): Promise<void> {
    try {
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(quote));
    } catch (error) {
      console.error('Failed to save cached quote:', error);
    }
  },

  async load(): Promise<Quote | null> {
    try {
      const json = await AsyncStorage.getItem(CACHE_KEY);
      if (json) {
        const data = JSON.parse(json);
        return new Quote(data.text, data.author);
      }
    } catch (error) {
      console.error('Failed to load cached quote:', error);
    }
    return null;
  }
};
