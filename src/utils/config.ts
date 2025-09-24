// Centralized configuration with type safety
const getEnvVar = (key: string, defaultValue?: string, silent: boolean = false): string => {
  const value = process.env[key as keyof typeof process.env];
  
  if (!value && !defaultValue && !silent) {
    // Only log once per key in development
    if (typeof window !== 'undefined' && !window.__envWarnings) {
      window.__envWarnings = new Set();
    }
    if (typeof window !== 'undefined' && !window.__envWarnings.has(key)) {
      console.warn(`Environment variable ${key} is not set`);
      window.__envWarnings.add(key);
    }
  }
  
  return value || defaultValue || '';
};

// Declare global to track warnings
declare global {
  interface Window {
    __envWarnings: Set<string>;
  }
}

export const config = {
  // API Keys - silent to avoid console spam
  api: {
    newsApiKey: getEnvVar('NEXT_PUBLIC_NEWS_API_KEY', '', true),
    tmdbApiKey: getEnvVar('NEXT_PUBLIC_TMDB_API_KEY', '', true),
    weatherApiKey: getEnvVar('NEXT_PUBLIC_WEATHER_API_KEY', '', true),
    spotifyApiKey: getEnvVar('NEXT_PUBLIC_SPOTIFY_API_KEY', '', true),
    twitterApiKey: getEnvVar('NEXT_PUBLIC_TWITTER_API_KEY', '', true),
  },
  
  // URLs
  urls: {
    apiUrl: typeof window !== 'undefined' 
      ? window.location.origin 
      : (getEnvVar('NEXT_PUBLIC_API_URL', 'http://localhost:3000', true)),
    newsApiUrl: 'https://newsapi.org/v2',
    tmdbApiUrl: 'https://api.themoviedb.org/3',
    tmdbImageUrl: 'https://image.tmdb.org/t/p/w500',
  },
  
  // Authentication - silent for optional features
  auth: {
    nextAuthUrl: getEnvVar('NEXTAUTH_URL', 'http://localhost:3000', true),
    nextAuthSecret: getEnvVar('NEXTAUTH_SECRET', '', true),
    googleClientId: getEnvVar('GOOGLE_CLIENT_ID', '', true),
    googleClientSecret: getEnvVar('GOOGLE_CLIENT_SECRET', '', true),
    githubId: getEnvVar('GITHUB_ID', '', true),
    githubSecret: getEnvVar('GITHUB_SECRET', '', true),
  },
  
  // Feature Flags
  features: {
    enableAnalytics: getEnvVar('NEXT_PUBLIC_ENABLE_ANALYTICS', 'false', true) === 'true',
    enableRealtime: getEnvVar('NEXT_PUBLIC_ENABLE_REALTIME', 'false', true) === 'true',
    enableNotifications: getEnvVar('NEXT_PUBLIC_ENABLE_NOTIFICATIONS', 'true', true) === 'true',
  },
  
  // Environment
  env: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
  },
  
  // Validation methods
  hasNewsApi: () => !!config.api.newsApiKey,
  hasTmdbApi: () => !!config.api.tmdbApiKey,
  isConfigured: () => !!(config.api.newsApiKey || config.api.tmdbApiKey),
};