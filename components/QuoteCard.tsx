// components/QuoteCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Quote from '../models/Quote';

interface QuoteCardProps {
  quote: Quote;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.content}>"{quote.text}"</Text>
      <Text style={styles.author}>— {quote.author}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    marginVertical: 16,
  },
  content: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#333',
    marginBottom: 12,
  },
  author: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    textAlign: 'right',
  },
});

export default QuoteCard;
