import { useColorScheme } from 'react-native';
import { theme, Theme } from '@/src/config/theme';

export function useTheme(): { theme: Theme; isDark: boolean } {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    theme: isDark ? theme.dark : theme.light,
    isDark,
  };
}
