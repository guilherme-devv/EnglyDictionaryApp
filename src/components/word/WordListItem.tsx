import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@/src/hooks';
import { styles } from './styles';

interface WordListItemProps {
  word: string;
  onPress: () => void;
}

export function WordListItem({ word, onPress }: WordListItemProps) {
  const { theme, isDark } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.listItemContainer,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.listItemText, { color: theme.text }]}>{word}</Text>
    </TouchableOpacity>
  );
}

