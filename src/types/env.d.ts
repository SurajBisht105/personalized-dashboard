declare namespace NodeJS {
  interface ProcessEnv {
    // API Keys
    NEXT_PUBLIC_NEWS_API_KEY: string;
    NEXT_PUBLIC_TMDB_API_KEY: string;
    NEXT_PUBLIC_WEATHER_API_KEY: string;
    NEXT_PUBLIC_SPOTIFY_API_KEY: string;
    NEXT_PUBLIC_TWITTER_API_KEY: string;
    
    // API URLs
    NEXT_PUBLIC_API_URL: string;
    
    // Authentication
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    
    // Database
    DATABASE_URL: string;
    REDIS_URL: string;
    
    // Feature Flags
    NEXT_PUBLIC_ENABLE_ANALYTICS: string;
    NEXT_PUBLIC_ENABLE_REALTIME: string;
    NEXT_PUBLIC_ENABLE_NOTIFICATIONS: string;
    
    // Monitoring
    SENTRY_DSN: string;
    SENTRY_ORG: string;
    SENTRY_PROJECT: string;
    
    // Analytics
    NEXT_PUBLIC_GA_MEASUREMENT_ID: string;
    NEXT_PUBLIC_MIXPANEL_TOKEN: string;
    
    // Node Environment
    NODE_ENV: 'development' | 'production' | 'test';
  }
}