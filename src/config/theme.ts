export const theme = {
  light: {
    background: '#F9FAFB',
    surface: '#FFFFFF',
    primary: '#3B82F6',
    primaryLight: '#60A5FA',
    text: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
  },
  dark: {
    background: '#111827',
    surface: '#1F2937',
    primary: '#2563EB',
    primaryLight: '#60A5FA',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    border: '#374151',
    error: '#F87171',
    success: '#34D399',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
  },
} as const;

export type Theme = typeof theme.light;
export type ThemeMode = 'light' | 'dark';
