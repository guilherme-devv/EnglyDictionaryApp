import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import { homeViewModel } from '@/src/viewmodels';
import { useViewModel, useTheme } from '@/src/hooks';
import { SearchBar, WordListItem, WordItemSkeleton } from '@/src/components';
import { styles } from '@/src/styles/screens/home';

export default function HomeScreen() {
  const router = useRouter();
  const { theme, isDark } = useTheme();

  const [state, viewModel] = useViewModel(
    homeViewModel,
    (vm) => vm.getState(),
    (vm, listener) => vm.subscribe(listener)
  );

  const {
    displayedWords,
    loading,
    loadingMore,
    refreshing,
    searchQuery
  } = state;

  const handleWordPress = useCallback((word: string) => {
    router.push({ pathname: '/detail/[word]', params: { word } });
  }, [router]);

  const handleClearSearch = useCallback(() => {
    viewModel.clearSearch();
    Keyboard.dismiss();
  }, [viewModel]);

  const renderItem = useCallback(({ item }: { item: string }) => (
    <WordListItem word={item} onPress={() => handleWordPress(item)} />
  ), [handleWordPress]);

  const renderFooter = useCallback(() => (
    loadingMore ? (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={theme.primaryLight} />
      </View>
    ) : null
  ), [loadingMore, theme.primaryLight]);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
          <Text style={[styles.title, { color: theme.text }]}>English Dictionary</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Loading dictionary...
          </Text>
          <SearchBar
            value={searchQuery}
            onChangeText={() => { }}
            onClear={() => { }}
          />
        </View>
        <FlatList
          data={Array.from({ length: 24 })}
          renderItem={() => <WordItemSkeleton />}
          keyExtractor={(_, i) => `skeleton-${i}`}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />
      </View>
    );
  }



  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>English Dictionary</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {searchQuery.trim()
            ? `${viewModel.getFilteredWordsCount().toLocaleString()} of ${viewModel.getTotalWordsCount().toLocaleString()} words`
            : `${viewModel.getTotalWordsCount().toLocaleString()} words`}
        </Text>

        <SearchBar
          value={searchQuery}
          onChangeText={(text) => viewModel.setSearchQuery(text)}
          onClear={handleClearSearch}
        />
      </View>

      <FlatList
        data={displayedWords}
        renderItem={renderItem}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        onEndReached={() => viewModel.loadMore()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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

