import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { NextRequest, NextResponse } from "next/server";
import { LRUCache } from "lru-cache";

// Initialize the cache using the function-based API
const cache = new LRUCache<string, any>({
  max: 100, // Maximum number of items in the cache
  ttl: 1000 * 60 * 60, // Time to live (TTL) in milliseconds (1 hour)
});

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params; // Get the slug from the URL params

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    // Check if the post is in the cache
    if (cache.has(slug)) {
      const cachedData = cache.get(slug);
      return NextResponse.json(cachedData);
    }

    const folder = path.join(process.cwd(), "content", "posts");
    const file = `${folder}/${slug}.md`;
    const content = await fs.readFile(file, "utf8");
    const matterResult = matter(content);

    // Store the parsed result in the cache
    cache.set(slug, matterResult);

    return NextResponse.json(matterResult);
  } catch (error) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
}
