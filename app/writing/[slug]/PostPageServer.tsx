// app/writing/[slug]/PostPageServer.tsx
import getPostMetadata from "@/components/getPostMetadata";
import { format } from "date-fns";
import fs from "fs";
import matter from "gray-matter";
import type { Metadata } from "next";
import PostPageClient from "./PostPageClient";


export const metadata: Metadata = {
  title: "Rendyansyah Syabany | Writing",
  description: "Digital Product Designer & Builder",
};

const getPostContent = (slug: string) => {
  const folder = "content/posts/";
  const file = `${folder}${slug}.md`;

  try {
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    return matterResult;
  } catch (error) {
    return null;
  }
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post: { slug: any }) => ({
    slug: post.slug,
  }));
};

const PostPageServer = (props: any) => {
  const { slug } = props.params;
  const post = getPostContent(slug);

  return (
    <>
      {post ? (
        <PostPageClient post={post} />
      ) : (
        <div>Content not found.</div>
      )}
    </>
  );
};

export default PostPageServer;
