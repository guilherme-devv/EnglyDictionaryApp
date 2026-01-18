import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, useColorScheme } from 'react-native';

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export function SkeletonLoader({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style
}: SkeletonLoaderProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        isDark ? styles.skeletonDark : styles.skeletonLight,
        { width, height, borderRadius, opacity },
        style,
      ]}
    />
  );
}

export function WordItemSkeleton() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.wordItemSkeleton, isDark && styles.wordItemSkeletonDark]}>
      <SkeletonLoader width="80%" height={14} />
    </View>
  );
}

export function DetailSkeleton() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.detailSkeleton, isDark && styles.detailSkeletonDark]}>
      <SkeletonLoader width="80%" height={40} style={styles.skeletonMarginBottom} />
      <SkeletonLoader width="40%" height={20} style={styles.skeletonMarginBottom} />

      <View style={styles.skeletonSection}>
        <SkeletonLoader width="50%" height={18} style={styles.skeletonMarginBottom} />
        <View style={[styles.phoneticItemSkeleton, isDark && styles.phoneticItemSkeletonDark]}>
          <SkeletonLoader width="30%" height={16} />
        </View>
      </View>

      <View style={styles.skeletonSection}>
        <SkeletonLoader width="30%" height={24} borderRadius={12} style={styles.skeletonMarginBottom} />
        <SkeletonLoader width="100%" height={16} style={styles.skeletonMarginBottom} />
        <SkeletonLoader width="90%" height={16} style={styles.skeletonMarginBottom} />
        <SkeletonLoader width="80%" height={16} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
  skeletonLight: {
    backgroundColor: '#E5E7EB',
  },
  skeletonDark: {
    backgroundColor: '#374151',
  },
  wordItemSkeleton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 8,
    margin: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  wordItemSkeletonDark: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
  },
  detailSkeleton: {
    padding: 20,
    backgroundColor: '#F9FAFB',
    flex: 1,
  },
  detailSkeletonDark: {
    backgroundColor: '#111827',
  },
  skeletonSection: {
    marginTop: 24,
  },
  skeletonMarginBottom: {
    marginBottom: 12,
  },
  phoneticItemSkeleton: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  phoneticItemSkeletonDark: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
  },
});
