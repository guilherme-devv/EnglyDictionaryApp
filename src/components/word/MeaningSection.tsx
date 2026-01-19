import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/src/hooks';
import { styles } from './styles';
import { Meaning } from '@/src/models';
import { DefinitionItem } from './DefinitionItem';

interface MeaningSectionProps {
  meaning: Meaning;
}

export function MeaningSection({ meaning }: MeaningSectionProps) {
  const { theme, isDark } = useTheme();

  return (
    <View style={styles.meaningContainer}>
      <View
        style={[
          styles.meaningBadge,
          {
            backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE',
          },
        ]}
      >
        <Text
          style={[
            styles.meaningPartOfSpeech,
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

