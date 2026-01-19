import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Star } from 'lucide-react-native';
import { FavoritesViewModel } from '@/src/viewmodels';
import { useViewModel, useTheme } from '@/src/hooks';
import { LoadingView, WordListItem, WordItemSkeleton } from '@/src/components';

const favoritesViewModel = new FavoritesViewModel();

export default function FavoritesScreen() {
  const router = useRouter();
  const { theme, isDark } = useTheme();

  const [state, viewModel] = useViewModel(
    favoritesViewModel,
    (vm) => vm.getState(),
    (vm, listener) => vm.subscribe(listener)
  );

  const { favorites, loading, refreshing } = state;

  const handleWordPress = useCallback((word: string) => {
    router.push({ pathname: '/detail/[word]', params: { word } });
  }, [router]);

  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <TouchableOpacity
        style={[
          styles.wordItem,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
          },
        ]}
        onPress={() => handleWordPress(item)}
        activeOpacity={0.7}
      >
        <Text style={[styles.wordText, { color: theme.text }]}>{item}</Text>
        <Star
          size={20}
          color={theme.warning}
          fill={theme.warning}
        />
      </TouchableOpacity>
    ),
    [handleWordPress, theme]
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Star size={64} color={theme.border} />
        <Text style={[styles.emptyText, { color: theme.text }]}>
          No favorites yet
        </Text>
        <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
          Tap the star icon on any word to add it to your favorites
        </Text>
      </View>
    ),
    [theme]
  );

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <View
          style={[
            styles.header,
            {
              backgroundColor: theme.surface,
              borderBottomColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.title, { color: theme.text }]}>Favorites</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Loading favorites...
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.listContent}>
          {Array.from({ length: 8 }).map((_, i) => (
            <WordItemSkeleton key={i} />
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.surface,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>Favorites</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {favorites.length} {favorites.length === 1 ? 'word' : 'words'}
        </Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item}-${index}`}
        contentContainerStyle={[
          styles.listContent,
          favorites.length === 0 && styles.listContentEmpty,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => viewModel.refresh()}
            tintColor={theme.primaryLight}
            colors={[theme.primary]}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  wordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  wordText: {
    fontSize: 18,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    gap: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
