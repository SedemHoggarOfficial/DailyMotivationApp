import Quote from '../models/Quote';
import { QuoteCache } from './QuoteCache';
import fallbackQuotes from '../assets/quotes.json';

export class QuoteService {
  static async fetchRandomQuote(): Promise<Quote | null> {
    const API_URL = 'https://zenquotes.io/api/random';

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Status: ${response.status}`);

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const quote = Quote.fromZenResponse(data[0]);
        await QuoteCache.save(quote);
        return quote;
      }
    } catch (err) {
      console.warn('Fetching from API failed, using fallback.');
    }

    return this.getCachedOrFallbackQuote();
  }

  static async getCachedOrFallbackQuote(): Promise<Quote> {
    const cached = await QuoteCache.load();
    if (cached) return cached;

    const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    return Quote.fromZenResponse(random);
  }
}
