import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  containerDark: {
    backgroundColor: '#111827',
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: '#111827',
    marginBottom: 8,
  },
  titleDark: {
    color: '#F9FAFB',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  subtitleDark: {
    color: '#9CA3AF',
  },
  link: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  linkDark: {
    backgroundColor: '#2563EB',
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
    color: "#FFFFFF",
  },
  linkTextDark: {
    color: '#F9FAFB',
  },
});
