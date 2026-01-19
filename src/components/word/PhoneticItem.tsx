import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Volume2, Loader2 } from 'lucide-react-native';
import { useTheme } from '@/src/hooks';
import { styles } from './styles';
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
        styles.phoneticContainer,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <Text style={[styles.phoneticText, { color: theme.primaryLight }]}>
        {phonetic.text}
      </Text>
      {phonetic.audio && (
        <TouchableOpacity
          style={[
            styles.phoneticButton,
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

