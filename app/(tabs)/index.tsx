// app/(tabs)/index.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import QuoteCard from '../../components/QuoteCard';
import Quote from '../../models/Quote';
import { QuoteService } from '../../services/QuoteService';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);

  const loadQuote = async () => {
    setLoading(true);
    const newQuote = await QuoteService.fetchRandomQuote();
    setQuote(newQuote);
    setLoading(false);
  };

  useEffect(() => {
    loadQuote();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          {quote && <QuoteCard quote={quote} />}
          <TouchableOpacity onPress={loadQuote} style={styles.refreshButton}>
            <Ionicons name="refresh" size={24} color="#fff" />
            <Text style={styles.buttonText}>New Quote</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f0f4f8',
  },
  refreshButton: {
    marginTop: 16,
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
});
