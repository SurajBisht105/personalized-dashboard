import { NextResponse } from 'next/server';

export async function GET() {
  const trendingHashtags = [
    'technology',
    'sports',
    'entertainment',
    'news',
    'politics',
    'science',
    'health',
    'travel',
    'food',
    'fashion',
  ];

  return NextResponse.json(trendingHashtags);
}