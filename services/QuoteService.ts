import Quote from '../models/Quote';

export class QuoteService {
  /**
   * Fetches a random quote from the ZenQuotes API.
   * @returns {Promise<Quote | null>} A Quote instance or null if fetching fails.
   */
  static async fetchRandomQuote(): Promise<Quote | null> {
    const API_URL = 'https://zenquotes.io/api/random';

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        console.error(`ZenQuotes API responded with status: ${response.status}`);
        return null;
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        return Quote.fromZenResponse(data[0]);
      } else {
        console.error('ZenQuotes API returned unexpected data format:', data);
      }
    } catch (error) {
      console.error('Failed to fetch quote from ZenQuotes:', error);
    }

    return null;
  }
}