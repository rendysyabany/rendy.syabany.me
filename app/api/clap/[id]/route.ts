import { NextRequest, NextResponse } from 'next/server';
import { pb, PostDetail } from '@/lib/pocketbase';

// Helper to fetch post by ID
async function getPost(id: string) {
  try {
     return await pb.collection("posts_published").getOne<PostDetail>(id, {
        expand: "author,labels",
     });
  } catch (e) {
     return null;
  }
}

// Handle POST requests
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Get the id from the URL params

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const post = await getPost(id);

    if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Update likes (claps)
    // Note: We use 'likes' field in PocketBase to store claps
    const currentLikes = post.likes || 0;
    const updatedPost = await pb.collection('posts_published').update<PostDetail>(post.id, {
        likes: currentLikes + 1
    });

    return NextResponse.json({ claps: updatedPost.likes }); // Return the updated claps count
  } catch (error) {
    console.error('PocketBase error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle GET requests (fetch claps)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Get the id from the URL params

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const post = await getPost(id);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json({ claps: post.likes || 0 }); // Return the claps count
  } catch (error) {
    console.error('PocketBase error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
