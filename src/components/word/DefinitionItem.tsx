import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/src/hooks';
import { styles } from './styles';
import { Definition } from '@/src/models';

interface DefinitionItemProps {
  definition: Definition;
  index: number;
}

export function DefinitionItem({ definition, index }: DefinitionItemProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.definitionContainer}>
      <Text style={[styles.definitionNumber, { color: theme.textSecondary }]}>
        {index + 1}.
      </Text>
      <View style={styles.definitionContent}>
        <Text style={[styles.definitionText, { color: theme.text }]}>
          {definition.definition}
        </Text>

        {definition.example && (
          <Text
            style={[
              styles.definitionExample,
              {
                color: theme.textSecondary,
                borderLeftColor: theme.border,
              },
            ]}
          >
            &ldquo;{definition.example}&rdquo;
          </Text>
        )}

        {definition.synonyms && definition.synonyms.length > 0 && (
          <View style={styles.tagContainer}>
            <Text style={[styles.tagLabel, { color: theme.textSecondary }]}>
              Synonyms:
            </Text>
            <Text style={[styles.tagText, { color: theme.primaryLight }]}>
              {definition.synonyms.join(', ')}
            </Text>
          </View>
        )}

        {definition.antonyms && definition.antonyms.length > 0 && (
          <View style={styles.tagContainer}>
            <Text style={[styles.tagLabel, { color: theme.textSecondary }]}>
              Antonyms:
            </Text>
            <Text style={[styles.tagText, { color: theme.primaryLight }]}>
              {definition.antonyms.join(', ')}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

