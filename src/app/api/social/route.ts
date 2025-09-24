import { NextRequest, NextResponse } from 'next/server';

// Mock social media data
const generateMockSocialPosts = (page: number, limit: number, hashtag?: string) => {
  const posts = Array.from({ length: limit }, (_, i) => {
    const index = (page - 1) * limit + i;
    return {
      id: `social-${index}`,
      username: `user${Math.floor(Math.random() * 1000)}`,
      content: `This is a social media post ${index}. ${hashtag ? `#${hashtag}` : ''} #trending #content`,
      image: Math.random() > 0.5 ? `https://picsum.photos/seed/social${index}/400/300` : undefined,
      likes: Math.floor(Math.random() * 10000),
      shares: Math.floor(Math.random() * 1000),
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      hashtags: hashtag ? [hashtag, 'trending'] : ['trending', 'content'],
    };
  });

  return {
    posts,
    hasMore: page < 10,
  };
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const hashtag = searchParams.get('hashtag') || undefined;
  const query = searchParams.get('q') || undefined;

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  if (query) {
    // Search endpoint
    const results = generateMockSocialPosts(page, limit);
    results.posts = results.posts.filter(post => 
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.username.toLowerCase().includes(query.toLowerCase())
    );
    return NextResponse.json(results);
  }

  // Feed endpoint
  const data = generateMockSocialPosts(page, limit, hashtag);
  return NextResponse.json(data);
}