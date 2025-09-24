import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/utils/config';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || 'general';
    const page = searchParams.get('page') || '1';
    const query = searchParams.get('q');
    
    const NEWS_API_KEY = config.api.newsApiKey;
    const NEWS_API_BASE_URL = config.urls.newsApiUrl;
    
    if (!NEWS_API_KEY) {
      console.error('News API key is not configured');
      return NextResponse.json(
        { 
          error: 'News API key is not configured',
          hint: 'Add NEXT_PUBLIC_NEWS_API_KEY to your .env.local file'
        },
        { status: 500 }
      );
    }

    let url: string;
    const params = new URLSearchParams({
      apiKey: NEWS_API_KEY,
      page: page,
      pageSize: '10',
      language: 'en',
    });

    if (query) {
      url = `${NEWS_API_BASE_URL}/everything?${params}&q=${encodeURIComponent(query)}`;
    } else {
      url = `${NEWS_API_BASE_URL}/top-headlines?${params}&category=${category}&country=us`;
    }

    console.log('Fetching from News API:', url.replace(NEWS_API_KEY, 'API_KEY_HIDDEN'));

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('News API Error:', errorData);
      throw new Error(errorData.message || 'Failed to fetch news');
    }

    const data = await response.json();
    
    const items = data.articles?.map((article: any, index: number) => ({
      id: `news-${Date.now()}-${index}`,
      type: 'news',
      title: article.title || 'No title',
      description: article.description || article.content || 'No description available',
      imageUrl: article.urlToImage || `https://picsum.photos/seed/${index}/400/300`,
      url: article.url,
      category: category,
      timestamp: new Date(article.publishedAt),
      source: article.source?.name || 'Unknown Source',
      author: article.author,
    })) || [];

    return NextResponse.json({
      items,
      totalResults: data.totalResults,
      page: parseInt(page),
      hasMore: data.articles?.length === 10,
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch news',
        message: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Make sure you have a valid NEWS_API_KEY in your .env.local file'
      },
      { status: 500 }
    );
  }
}