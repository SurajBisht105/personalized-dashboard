import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/utils/config';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const query = searchParams.get('q');
    const category = searchParams.get('category') || 'popular';

    const TMDB_API_KEY = config.api.tmdbApiKey;
    const TMDB_BASE_URL = config.urls.tmdbApiUrl;
    const TMDB_IMAGE_BASE = config.urls.tmdbImageUrl;

    if (!TMDB_API_KEY) {
      console.error('TMDB API key is not configured');
      return NextResponse.json(
        { 
          error: 'TMDB API key is not configured',
          hint: 'Add NEXT_PUBLIC_TMDB_API_KEY to your .env.local file'
        },
        { status: 500 }
      );
    }

    let url: string;
    const params = new URLSearchParams({
      api_key: TMDB_API_KEY,
      page: page,
      language: 'en-US',
    });

    if (query) {
      url = `${TMDB_BASE_URL}/search/movie?${params}&query=${encodeURIComponent(query)}`;
    } else {
      switch (category) {
        case 'trending':
          url = `${TMDB_BASE_URL}/trending/movie/week?${params}`;
          break;
        case 'top_rated':
          url = `${TMDB_BASE_URL}/movie/top_rated?${params}`;
          break;
        default:
          url = `${TMDB_BASE_URL}/movie/popular?${params}`;
      }
    }

    console.log('Fetching from TMDB:', url.replace(TMDB_API_KEY, 'API_KEY_HIDDEN'));

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('TMDB API Error:', errorData);
      throw new Error(errorData.status_message || 'Failed to fetch movies');
    }

    const data = await response.json();

    const items = data.results?.map((movie: any, index: number) => ({
      id: `movie-${movie.id}`,
      type: 'recommendation',
      title: movie.title || movie.name || 'No title',
      description: movie.overview || 'No description available',
      imageUrl: movie.poster_path 
        ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
        : `https://picsum.photos/seed/movie${index}/400/600`,
      url: `https://www.themoviedb.org/movie/${movie.id}`,
      category: 'entertainment',
      timestamp: new Date(movie.release_date || Date.now()),
      source: 'TMDB',
      rating: movie.vote_average,
      popularity: movie.popularity,
    })) || [];

    return NextResponse.json({
      items,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      hasMore: data.page < data.total_pages,
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch movies',
        message: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Make sure you have a valid TMDB_API_KEY in your .env.local file'
      },
      { status: 500 }
    );
  }
}