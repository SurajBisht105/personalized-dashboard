import { NextRequest, NextResponse } from 'next/server';
import { ContentItem } from '@/types';

// Mock API endpoint for content fetching
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const categories = searchParams.get('categories')?.split(',') || [];
  const query = searchParams.get('q') || '';

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Generate mock content
  const items: ContentItem[] = Array.from({ length: 10 }, (_, i) => ({
    id: `${page}-${i}`,
    type: ['news', 'recommendation', 'social'][Math.floor(Math.random() * 3)] as any,
    title: `Content Item ${page * 10 + i}`,
    description: `This is a description for content item ${page * 10 + i}. It contains interesting information.`,
    imageUrl: `https://picsum.photos/seed/${page * 10 + i}/400/300`,
    url: '#',
    category: categories[Math.floor(Math.random() * categories.length)] || 'general',
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    source: ['NewsAPI', 'TMDB', 'Twitter'][Math.floor(Math.random() * 3)],
  }));

  // Filter by query if provided
  const filteredItems = query
    ? items.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  return NextResponse.json({
    items: filteredItems,
    page,
    hasMore: page < 5, // Limit to 5 pages for demo
    total: 50,
  });
}