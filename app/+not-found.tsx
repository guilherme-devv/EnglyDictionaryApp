import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View, useColorScheme } from "react-native";

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <View style={[styles.container, isDark && styles.containerDark]}>
        <Text style={[styles.title, isDark && styles.titleDark]}>Word not found</Text>
        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
          This page doesn&apos;t exist in the dictionary.
        </Text>

        <Link href="/" style={[styles.link, isDark && styles.linkDark]}>
          <Text style={[styles.linkText, isDark && styles.linkTextDark]}>Back to Dictionary</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
