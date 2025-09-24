import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewsItem } from '@/types';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2';

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Array<{
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
  }>;
}

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: NEWS_API_URL,
    prepareHeaders: (headers) => {
      headers.set('X-Api-Key', NEWS_API_KEY || '');
      return headers;
    },
  }),
  tagTypes: ['News'],
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<NewsItem[], { category?: string; country?: string; page?: number }>({
      query: ({ category = 'general', country = 'us', page = 1 }) => ({
        url: '/top-headlines',
        params: {
          category,
          country,
          page,
          pageSize: 20,
        },
      }),
      transformResponse: (response: NewsResponse): NewsItem[] => {
        return response.articles.map((article, index) => ({
          id: `news-${Date.now()}-${index}`,
          type: 'news' as const,
          title: article.title,
          description: article.description || '',
          imageUrl: article.urlToImage || undefined,
          url: article.url,
          category: 'news',
          timestamp: new Date(article.publishedAt),
          source: article.source.name,
          author: article.author || undefined,
          publishedAt: article.publishedAt,
        }));
      },
      providesTags: ['News'],
    }),
    searchNews: builder.query<NewsItem[], { query: string; sortBy?: string; page?: number }>({
      query: ({ query, sortBy = 'relevancy', page = 1 }) => ({
        url: '/everything',
        params: {
          q: query,
          sortBy,
          page,
          pageSize: 20,
        },
      }),
      transformResponse: (response: NewsResponse): NewsItem[] => {
        return response.articles.map((article, index) => ({
          id: `news-search-${Date.now()}-${index}`,
          type: 'news' as const,
          title: article.title,
          description: article.description || '',
          imageUrl: article.urlToImage || undefined,
          url: article.url,
          category: 'news',
          timestamp: new Date(article.publishedAt),
          source: article.source.name,
          author: article.author || undefined,
          publishedAt: article.publishedAt,
        }));
      },
    }),
  }),
});

export const { useGetTopHeadlinesQuery, useSearchNewsQuery } = newsApi;