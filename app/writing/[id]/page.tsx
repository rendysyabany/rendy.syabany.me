import { pb, PostDetail } from "@/lib/pocketbase";
import { notFound } from "next/navigation";
import PostPageClient from "./PostPageClient";
import { Metadata } from "next";
import { truncateText } from "@/lib/utils";

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

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getPost(params.id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Rendyansyah Syabany`,
    description: post.summary || truncateText(post.content.replace(/<[^>]*>?/gm, ""), 155),
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.created.toString(),
      images: post.featuredImage ? [pb.files.getURL(post, post.featuredImage)] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  let imageUrl = null;
  if (post.images && post.images.length > 0) {
      imageUrl = pb.files.getURL(post, post.images[0]);
  }

  // Map PocketBase data to the structure expected by PostPageClient
  const mappedPost = {
    id: post.id, // Pass the ID
    data: {
      title: post.title,
      shortDescription: post.summary,
      datePublished: post.created,
      imageUrl: imageUrl, // Pass the image URL
    },
    content: post.content,
  };

  return <PostPageClient post={mappedPost} />;
}
