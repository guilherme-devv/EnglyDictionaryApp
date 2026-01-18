import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks';
import { Definition } from '@/src/models';

interface DefinitionItemProps {
  definition: Definition;
  index: number;
}

export function DefinitionItem({ definition, index }: DefinitionItemProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.number, { color: theme.textSecondary }]}>
        {index + 1}.
      </Text>
      <View style={styles.content}>
        <Text style={[styles.definition, { color: theme.text }]}>
          {definition.definition}
        </Text>

        {definition.example && (
          <Text
            style={[
              styles.example,
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  number: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  definition: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  example: {
    fontSize: 15,
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 8,
    paddingLeft: 12,
    borderLeftWidth: 3,
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
