import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RecommendationItem } from '@/types';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

interface MovieResponse {
  page: number;
  results: Array<{
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
  }>;
  total_pages: number;
  total_results: number;
}

const genreMap: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export const recommendationsApi = createApi({
  reducerPath: 'recommendationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: TMDB_API_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${TMDB_API_KEY}`);
      return headers;
    },
  }),
  tagTypes: ['Recommendations'],
  endpoints: (builder) => ({
    getTrending: builder.query<RecommendationItem[], { timeWindow?: 'day' | 'week'; page?: number }>({
      query: ({ timeWindow = 'day', page = 1 }) => ({
        url: `/trending/movie/${timeWindow}`,
        params: {
          api_key: TMDB_API_KEY,
          page,
        },
      }),
      transformResponse: (response: MovieResponse): RecommendationItem[] => {
        return response.results.map((movie) => ({
          id: `movie-${movie.id}`,
          type: 'recommendation' as const,
          title: movie.title,
          description: movie.overview,
          imageUrl: movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : undefined,
          url: `https://www.themoviedb.org/movie/${movie.id}`,
          category: 'movie',
          timestamp: new Date(movie.release_date),
          source: 'TMDB',
          rating: movie.vote_average,
          genre: movie.genre_ids
            .map(id => genreMap[id])
            .filter((genre): genre is string => Boolean(genre)),
        }));
      },
      providesTags: ['Recommendations'],
    }),
    getPopular: builder.query<RecommendationItem[], { page?: number }>({
      query: ({ page = 1 }) => ({
        url: '/movie/popular',
        params: {
          api_key: TMDB_API_KEY,
          page,
        },
      }),
      transformResponse: (response: MovieResponse): RecommendationItem[] => {
        return response.results.map((movie) => ({
          id: `movie-popular-${movie.id}`,
          type: 'recommendation' as const,
          title: movie.title,
          description: movie.overview,
          imageUrl: movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : undefined,
          url: `https://www.themoviedb.org/movie/${movie.id}`,
          category: 'movie',
          timestamp: new Date(movie.release_date),
          source: 'TMDB',
          rating: movie.vote_average,
          genre: movie.genre_ids
            .map(id => genreMap[id])
            .filter((genre): genre is string => Boolean(genre)),
        }));
      },
    }),
    searchMovies: builder.query<RecommendationItem[], { query: string; page?: number }>({
      query: ({ query, page = 1 }) => ({
        url: '/search/movie',
        params: {
          api_key: TMDB_API_KEY,
          query,
          page,
        },
      }),
      transformResponse: (response: MovieResponse): RecommendationItem[] => {
        return response.results.map((movie) => ({
          id: `movie-search-${movie.id}`,
          type: 'recommendation' as const,
          title: movie.title,
          description: movie.overview,
          imageUrl: movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : undefined,
          url: `https://www.themoviedb.org/movie/${movie.id}`,
          category: 'movie',
          timestamp: new Date(movie.release_date),
          source: 'TMDB',
          rating: movie.vote_average,
          genre: movie.genre_ids
            .map(id => genreMap[id])
            .filter((genre): genre is string => Boolean(genre)),
        }));
      },
    }),
  }),
});

export const { 
  useGetTrendingQuery, 
  useGetPopularQuery, 
  useSearchMoviesQuery 
} = recommendationsApi;