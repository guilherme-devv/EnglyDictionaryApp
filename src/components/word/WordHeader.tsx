import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks';

interface WordHeaderProps {
  word: string;
  phonetic?: string;
}

export function WordHeader({ word, phonetic }: WordHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.word, { color: theme.text }]}>{word}</Text>
      {phonetic && (
        <Text style={[styles.phonetic, { color: theme.primaryLight }]}>
          {phonetic}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  word: {
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 8,
  },
  phonetic: {
    fontSize: 20,
    fontWeight: '500',
  },
});
