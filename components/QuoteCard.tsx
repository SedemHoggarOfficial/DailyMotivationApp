import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuotePresenter } from '../presenters/QuotePresenter';

const QuoteCard = () => {
  const { quote, loading, error, refreshQuote } = useQuotePresenter();

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : quote ? (
        <>
          <Text style={styles.quoteText}>“{quote.text}”</Text>
          <Text style={styles.authorText}>— {quote.author || 'Unknown'}</Text>
        </>
      ) : (
        <Text style={styles.errorText}>No quote available.</Text>
      )}

      <TouchableOpacity style={styles.refreshButton} onPress={refreshQuote}>
        <Ionicons name="refresh" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default QuoteCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 24,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  authorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  refreshButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 30,
    elevation: 2,
  },
});
