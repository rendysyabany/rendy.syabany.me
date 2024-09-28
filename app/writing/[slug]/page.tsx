import getPostMetadata from "@/components/getPostMetadata";
import MainMarkdown from "@/components/ui/markdown";
import { format } from "date-fns";
import fs from "fs";
import matter from "gray-matter";

import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Rendyansyah Syabany | Writing',
  description: 'Digital Product Designer & Builder',
}

const getPostContent = (slug: string) => {
  const folder = "content/posts/";
  const file = `${folder}${slug}.md`;

  try {
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    return matterResult;
  } catch (error) {
    // console.error("Error reading post content:", error);
    return null;
  }
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post: { slug: any }) => ({
    slug: post.slug,
  }));
};

const PostPage = (props: any) => {
  const { slug } = props.params;
  const post = getPostContent(slug);

  if (!post) {
    return <div>Content not found.</div>;
  }

  const {
    data: { title, shortDescription, datePublished },
    content,
  } = post;

  return (
    <>
      <div className="mx-5 flex flex-col gap-6">
        <div className="flex flex-col gap-8">
          <div className="inline-flex flex-col items-start justify-start gap-4">
            <p className="mb-2 font-serif text-sm font-normal leading-normal tracking-normal text-gray-500">
              Published on {format(new Date(datePublished), "dd MMMM yyyy")}
            </p>
            <h1 className="font-sans text-xl font-semibold leading-7 tracking-normal text-gray-700 sm:text-3xl sm:leading-9">
              {title}
            </h1>
            <h3 className="text-md font-serif font-normal leading-normal tracking-normal text-gray-500">
              {shortDescription}
            </h3>
          </div>
        </div>

        <div className="my-4 border-t border-gray-300"></div>

        <article className="prose prose-quoteless prose-neutral md:prose-lg dark:prose-invert prose-h2:font-kasei dark:prose-a:text-neutral-500 pb-8">
          <MainMarkdown classStyle="flex flex-col gap-2" content={content} />
        </article>
      </div>
    </>
  );
};

export default PostPage;
