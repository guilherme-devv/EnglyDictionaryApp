import React, { useEffect, useRef } from 'react';
import { View, Animated, useColorScheme } from 'react-native';
import { styles } from './styles';

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

