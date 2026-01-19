import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, Trash2 } from 'lucide-react-native';
import { HistoryViewModel } from '@/src/viewmodels';
import { useViewModel, useTheme } from '@/src/hooks';
import { LoadingView, WordItemSkeleton } from '@/src/components';
import { styles } from '@/src/styles/screens/history';

const historyViewModel = new HistoryViewModel();

export default function HistoryScreen() {
  const router = useRouter();
  const { theme, isDark } = useTheme();

  const [state, viewModel] = useViewModel(
    historyViewModel,
    (vm) => vm.getState(),
    (vm, listener) => vm.subscribe(listener)
  );

  const { history, loading, refreshing } = state;

  const handleClearHistory = useCallback(() => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => viewModel.clearAll(),
        },
      ]
    );
  }, [viewModel]);

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
        <View style={styles.wordContent}>
          <Text style={[styles.wordText, { color: theme.text }]}>{item}</Text>
        </View>
      </TouchableOpacity>
    ),
    [handleWordPress, theme]
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Clock size={64} color={theme.border} />
        <Text style={[styles.emptyText, { color: theme.text }]}>
          No history yet
        </Text>
        <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
          Words you look up will appear here
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
          <View>
            <Text style={[styles.title, { color: theme.text }]}>History</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Loading history...
            </Text>
          </View>
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
        <View>
          <Text style={[styles.title, { color: theme.text }]}>History</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {history.length} {history.length === 1 ? 'word' : 'words'}
          </Text>
        </View>
        {history.length > 0 && (
          <TouchableOpacity
            style={[styles.clearButton, { backgroundColor: isDark ? '#7F1D1D' : '#FEF2F2' }]}
            onPress={handleClearHistory}
            activeOpacity={0.7}
          >
            <Trash2 size={18} color={theme.error} />
            <Text style={[styles.clearText, { color: theme.error }]}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item}-${index}`}
        contentContainerStyle={[
          styles.listContent,
          history.length === 0 && styles.listContentEmpty,
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

