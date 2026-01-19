import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '@/src/hooks';
import { styles } from './styles';

interface LoadingViewProps {
  message?: string;
}

export function LoadingView({ message = 'Loading...' }: LoadingViewProps) {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ActivityIndicator size="large" color={theme.primaryLight} />
      <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
        {message}
      </Text>
    </View>
  );
}

