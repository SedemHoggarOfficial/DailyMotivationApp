import { useState, useEffect } from 'react';
import Quote from '../models/Quote';
import { QuoteService } from '../services/QuoteService';

export function useQuotePresenter() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInitialQuote();
  }, []);

  const loadInitialQuote = async () => {
    setLoading(true);
    try {
      const fetched = await QuoteService.fetchRandomQuote();
      if (fetched) {
        setQuote(fetched);
      } else {
        setError('Unable to load a quote.');
      }
    } catch (err) {
      setError('Something went wrong while loading the quote.');
    } finally {
      setLoading(false);
    }
  };

  const refreshQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const newQuote = await QuoteService.fetchRandomQuote();
      if (newQuote) {
        setQuote(newQuote);
      } else {
        setError('No quote found.');
      }
    } catch (err) {
      setError('Failed to refresh the quote.');
    } finally {
      setLoading(false);
    }
  };

  return {
    quote,
    loading,
    error,
    refreshQuote,
  };
}
export default useQuotePresenter;