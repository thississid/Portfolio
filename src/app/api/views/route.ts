import { NextRequest, NextResponse } from 'next/server';

// In-memory storage (for demo - use a database in production)
const viewCounts: Record<string, number> = {};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const count = viewCounts[slug] || 0;
  return NextResponse.json({ slug, views: count });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // Increment view count
    viewCounts[slug] = (viewCounts[slug] || 0) + 1;

    return NextResponse.json({ 
      slug, 
      views: viewCounts[slug],
      message: 'View count incremented' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to increment view count' },
      { status: 500 }
    );
  }
}
