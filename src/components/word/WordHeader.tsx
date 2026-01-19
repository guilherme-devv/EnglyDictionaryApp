import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/src/hooks';
import { styles } from './styles';

interface WordHeaderProps {
  word: string;
  phonetic?: string;
}

export function WordHeader({ word, phonetic }: WordHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerWord, { color: theme.text }]}>{word}</Text>
      {phonetic && (
        <Text style={[styles.headerPhonetic, { color: theme.primaryLight }]}>
          {phonetic}
        </Text>
      )}
    </View>
  );
}

