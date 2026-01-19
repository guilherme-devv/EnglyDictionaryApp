import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

  
  loadingText: {
    fontSize: 16,
    marginTop: 12,
  },

  
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  
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
