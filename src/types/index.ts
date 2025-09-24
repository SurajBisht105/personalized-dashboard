export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ContentItem {
  id: string;
  type: 'news' | 'recommendation' | 'social';
  title: string;
  description: string;
  imageUrl?: string;
  url: string;
  category: string;
  timestamp: Date;
  source: string;
  isFavorite?: boolean;
}

export interface NewsItem extends ContentItem {
  author?: string;
  publishedAt: string;
}

export interface RecommendationItem extends ContentItem {
  rating?: number;
  genre?: string[];
}

export interface SocialPost extends ContentItem {
  username: string;
  likes?: number;
  shares?: number;
}

export interface UserPreferences {
  categories: string[];
  darkMode: boolean;
  language: string;
  contentSources: {
    news: boolean;
    recommendations: boolean;
    social: boolean;
  };
}

export interface DashboardState {
  content: ContentItem[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}