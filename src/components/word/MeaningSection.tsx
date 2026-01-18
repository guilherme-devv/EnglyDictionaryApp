import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks';
import { Meaning } from '@/src/models';
import { DefinitionItem } from './DefinitionItem';

interface MeaningSectionProps {
  meaning: Meaning;
}

export function MeaningSection({ meaning }: MeaningSectionProps) {
  const { theme, isDark } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.badge,
          {
            backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
          },
        ]}
      >
        <Text
          style={[
            styles.partOfSpeech,
            {
              color: isDark ? '#93C5FD' : '#1E40AF',
            },
          ]}
        >
          {meaning.partOfSpeech}
        </Text>
      </View>

      {meaning.definitions.map((def, index) => (
        <DefinitionItem key={index} definition={def} index={index} />
      ))}

      {meaning.synonyms && meaning.synonyms.length > 0 && (
        <View style={styles.tagContainer}>
          <Text style={[styles.tagLabel, { color: theme.textSecondary }]}>
            All synonyms:
          </Text>
          <Text style={[styles.tagText, { color: theme.primaryLight }]}>
            {meaning.synonyms.join(', ')}
          </Text>
        </View>
      )}

      {meaning.antonyms && meaning.antonyms.length > 0 && (
        <View style={styles.tagContainer}>
          <Text style={[styles.tagLabel, { color: theme.textSecondary }]}>
            All antonyms:
          </Text>
          <Text style={[styles.tagText, { color: theme.primaryLight }]}>
            {meaning.antonyms.join(', ')}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  partOfSpeech: {
    fontSize: 14,
    fontWeight: '600',
  },
  tagContainer: {
    marginTop: 8,
  },
  tagLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  tagText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
