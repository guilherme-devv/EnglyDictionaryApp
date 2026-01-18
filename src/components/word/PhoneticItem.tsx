import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Volume2, Loader2 } from 'lucide-react-native';
import { useTheme } from '@/src/hooks';
import { Phonetic } from '@/src/models';

interface PhoneticItemProps {
  phonetic: Phonetic;
  isPlaying: boolean;
  onPlay: () => void;
}

export function PhoneticItem({ phonetic, isPlaying, onPlay }: PhoneticItemProps) {
  const { theme, isDark } = useTheme();

  if (!phonetic.text) return null;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <Text style={[styles.text, { color: theme.primaryLight }]}>
        {phonetic.text}
      </Text>
      {phonetic.audio && (
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isPlaying
                ? theme.primary
                : isDark
                  ? '#1E3A8A'
                  : '#EFF6FF',
            },
          ]}
          activeOpacity={0.7}
          onPress={onPlay}
        >
          {isPlaying ? (
            <Loader2 size={18} color="#FFFFFF" />
          ) : (
            <Volume2 size={18} color={theme.primaryLight} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
