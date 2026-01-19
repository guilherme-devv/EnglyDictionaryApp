import { Link, Stack } from "expo-router";
import { Text, View, useColorScheme } from "react-native";
import { styles } from "@/src/styles/screens/not-found";

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

