import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { WordDetailViewModel } from '@/src/viewmodels';
import { useViewModel, useTheme } from '@/src/hooks';
import {
  LoadingView,
  ErrorView,
  WordHeader,
  PhoneticItem,
  MeaningSection,
  DetailSkeleton,
} from '@/src/components';

export default function DetailScreen() {
  const { word } = useLocalSearchParams<{ word: string }>();
  const router = useRouter();
  const { theme, isDark } = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const [state, viewModel] = useViewModel(
    WordDetailViewModel,
    (vm) => vm.getState(),
    (vm, listener) => vm.subscribe(listener),
    word || ''
  );

  const {
    wordData,
    loading,
    error,
    isFavorite,
    playingAudioUrl,
    hasNext,
    hasPrevious
  } = state;

  useEffect(() => {
    if (!loading && wordData) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loading, wordData, fadeAnim, scaleAnim]);

  useEffect(() => {
    return () => {
      viewModel.cleanup();
    };
  }, [viewModel]);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Stack.Screen
          options={{
            title: word || 'Loading...',
            headerStyle: { backgroundColor: theme.surface },
            headerTintColor: theme.text,
            headerTitleStyle: { fontWeight: '700', fontSize: 18 },
            headerShadowVisible: true,
          }}
        />
        <DetailSkeleton />
      </View>
    );
  }

  if (error || !wordData) {
    return (
      <>
        <Stack.Screen
          options={{
            title: word || 'Error',
            headerStyle: { backgroundColor: theme.surface },
            headerTintColor: theme.text,
            headerTitleStyle: { fontWeight: '700', fontSize: 18 },
            headerShadowVisible: true,
          }}
        />
        <ErrorView
          message={error || 'Word not found'}
          onRetry={() => viewModel.retry()}
        />
      </>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen
        options={{
          title: wordData.word || word || 'Word',
          headerStyle: { backgroundColor: theme.surface },
          headerTintColor: theme.text,
          headerTitleStyle: { fontWeight: '700', fontSize: 20 },
          headerShadowVisible: true,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => viewModel.toggleFavorite()}
              style={styles.favoriteButton}
              activeOpacity={0.7}
            >
              <Star
                size={26}
                color={isFavorite ? theme.warning : theme.textSecondary}
                fill={isFavorite ? theme.warning : 'transparent'}
                strokeWidth={2.5}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <WordHeader word={wordData.word} phonetic={wordData.phonetic} />

          {wordData.phonetics && wordData.phonetics.length > 0 && (
            <View style={styles.phoneticsSection}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Pronunciations</Text>
              {wordData.phonetics.map((phonetic, index) => (
                <PhoneticItem
                  key={index}
                  phonetic={phonetic}
                  isPlaying={playingAudioUrl === phonetic.audio}
                  onPlay={() => phonetic.audio && viewModel.playAudio(phonetic.audio)}
                />
              ))}
            </View>
          )}

          {wordData.meanings?.map((meaning, index) => (
            <MeaningSection key={index} meaning={meaning} />
          ))}

          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[
                styles.navButton,
                { backgroundColor: theme.surface },
                !hasPrevious && styles.disabledButton
              ]}
              onPress={async () => {
                const prev = await viewModel.navigateToPrevious();
                if (prev) router.setParams({ word: prev });
              }}
              disabled={!hasPrevious}
            >
              <ChevronLeft size={20} color={hasPrevious ? theme.primary : theme.textSecondary} />
              <Text style={[styles.navButtonText, { color: hasPrevious ? theme.text : theme.textSecondary }]}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                { backgroundColor: theme.surface },
                !hasNext && styles.disabledButton
              ]}
              onPress={async () => {
                const next = await viewModel.navigateToNext();
                if (next) router.setParams({ word: next });
              }}
              disabled={!hasNext}
            >
              <Text style={[styles.navButtonText, { color: hasNext ? theme.text : theme.textSecondary }]}>Next</Text>
              <ChevronRight size={20} color={hasNext ? theme.primary : theme.textSecondary} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  phoneticsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  favoriteButton: {
    marginRight: 12,
    padding: 8,
    borderRadius: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 60,
    gap: 12,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  disabledButton: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
});
