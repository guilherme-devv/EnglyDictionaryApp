export const API_CONFIG = {
  BASE_URL: 'https://api.dictionaryapi.dev/api/v2/entries/en',
  WORDS_URL: 'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json',
  TIMEOUT: 10000,
} as const;

export const STORAGE_KEYS = {
  FAVORITES: '@favorites',
  HISTORY: '@history',
  WORDS_CACHE: '@words_dictionary',
  CACHE_PREFIX: '@word_cache_',
} as const;

export const CACHE_CONFIG = {
  EXPIRY_DAYS: 7,
  MAX_HISTORY_ITEMS: 100,
} as const;

export const PAGINATION_CONFIG = {
  ITEMS_PER_PAGE: 30,
} as const;
