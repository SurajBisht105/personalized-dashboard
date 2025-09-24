import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SocialPost } from '@/types';

// Mock social API since Twitter API requires OAuth
const MOCK_API_URL = '/api/social';

interface SocialResponse {
  posts: Array<{
    id: string;
    username: string;
    content: string;
    image?: string;
    likes: number;
    shares: number;
    timestamp: string;
    hashtags: string[];
  }>;
  hasMore: boolean;
}

export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({
    baseUrl: MOCK_API_URL,
  }),
  tagTypes: ['Social'],
  endpoints: (builder) => ({
    getSocialFeed: builder.query<SocialPost[], { hashtag?: string; page?: number }>({
      query: ({ hashtag, page = 1 }) => ({
        url: '/feed',
        params: {
          hashtag,
          page,
          limit: 20,
        },
      }),
      transformResponse: (response: SocialResponse): SocialPost[] => {
        return response.posts.map((post) => ({
          id: post.id,
          type: 'social' as const,
          title: `@${post.username}`,
          description: post.content,
          imageUrl: post.image,
          url: `#social-${post.id}`,
          category: 'social',
          timestamp: new Date(post.timestamp),
          source: 'Social Media',
          username: post.username,
          likes: post.likes,
          shares: post.shares,
        }));
      },
      providesTags: ['Social'],
    }),
    getTrendingHashtags: builder.query<string[], void>({
      query: () => '/trending-hashtags',
    }),
    searchSocialPosts: builder.query<SocialPost[], { query: string; page?: number }>({
      query: ({ query, page = 1 }) => ({
        url: '/search',
        params: {
          q: query,
          page,
          limit: 20,
        },
      }),
      transformResponse: (response: SocialResponse): SocialPost[] => {
        return response.posts.map((post) => ({
          id: `social-search-${post.id}`,
          type: 'social' as const,
          title: `@${post.username}`,
          description: post.content,
          imageUrl: post.image,
          url: `#social-${post.id}`,
          category: 'social',
          timestamp: new Date(post.timestamp),
          source: 'Social Media',
          username: post.username,
          likes: post.likes,
          shares: post.shares,
        }));
      },
    }),
  }),
});

export const { 
  useGetSocialFeedQuery, 
  useGetTrendingHashtagsQuery,
  useSearchSocialPostsQuery 
} = socialApi;