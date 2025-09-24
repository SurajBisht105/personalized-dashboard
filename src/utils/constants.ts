export const API_ENDPOINTS = {
  NEWS: {
    TOP_HEADLINES: '/top-headlines',
    EVERYTHING: '/everything',
    SOURCES: '/sources',
  },
  TMDB: {
    TRENDING: '/trending',
    POPULAR: '/movie/popular',
    TOP_RATED: '/movie/top_rated',
    SEARCH: '/search/movie',
  },
  SOCIAL: {
    FEED: '/feed',
    TRENDING: '/trending-hashtags',
    SEARCH: '/search',
  },
};

export const CATEGORIES = [
  { id: 'technology', label: 'Technology', icon: '💻' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'finance', label: 'Finance', icon: '💰' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { id: 'health', label: 'Health', icon: '🏥' },
  { id: 'science', label: 'Science', icon: '🔬' },
  { id: 'politics', label: 'Politics', icon: '🏛️' },
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'travel', label: 'Travel', icon: '✈️' },
  { id: 'food', label: 'Food', icon: '🍔' },
];

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
];

export const SORT_OPTIONS = [
  { value: 'relevancy', label: 'Most Relevant' },
  { value: 'popularity', label: 'Most Popular' },
  { value: 'publishedAt', label: 'Newest First' },
  { value: 'publishedAt-asc', label: 'Oldest First' },
];

export const TIME_WINDOWS = {
  TODAY: 'day',
  THIS_WEEK: 'week',
  THIS_MONTH: 'month',
  THIS_YEAR: 'year',
};

export const CONTENT_TYPES = {
  NEWS: 'news',
  RECOMMENDATION: 'recommendation',
  SOCIAL: 'social',
};

export const PAGE_SIZE = 20;
export const MAX_FAVORITES = 100;
export const DEBOUNCE_DELAY = 500;
export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Content not found.',
  UNAUTHORIZED: 'You need to be logged in to perform this action.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
};

export const SUCCESS_MESSAGES = {
  SETTINGS_SAVED: 'Your settings have been saved successfully.',
  FAVORITE_ADDED: 'Added to favorites.',
  FAVORITE_REMOVED: 'Removed from favorites.',
  CONTENT_SHARED: 'Content shared successfully.',
};