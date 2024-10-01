import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma'; // Update this path based on your project structure

// Handle POST requests
export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params; // Get the slug from the URL params

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { claps: { increment: 1 } },
    });
    return NextResponse.json(post); // Return the updated post with claps
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle GET requests (if you want to fetch claps)
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params; // Get the slug from the URL params

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    const claps = await prisma.post.findUnique({
      where: { slug },
    });
    if (!claps) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(claps); // Return the claps count for the specified slug
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
