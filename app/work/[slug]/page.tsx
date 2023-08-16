import React from "react";
import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "@/components/getPostMetadata";
import { format } from "date-fns";
import MainMarkdown from "@/components/ui/markdown";

const getPostContent = (slug: string) => {
  const folder = "content/works/";
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

const WorkPage = (props: any) => {
  const { slug } = props.params;
  const post = getPostContent(slug);

  if (!post) {
    return <div>Content not found.</div>;
  }

  const {
    data: { title, shortDescription, client, role, deliverables, liveUrl },
    content,
  } = post;

  return (
    <div className="mx-5 flex w-full flex-col gap-4">
      <div className="flex flex-col gap-8">
        <div className="inline-flex flex-col items-start justify-start gap-4">
          <p className="font-sans text-xl font-semibold leading-7 tracking-normal text-gray-700 sm:text-3xl sm:leading-9">
            {title}
          </p>
          <p className="text-md font-serif font-normal leading-normal tracking-normal text-gray-500">
            {shortDescription}
          </p>
        </div>
      </div>

      <div className="my-4 border-t border-gray-300"></div>

      <div className="flex gap-4 sm:gap-8">
        <div className="flex flex-col gap-0 sm:gap-2">
          <p className="text-xs sm:text-md font-sans font-semibold leading-7 tracking-normal text-gray-700">
            Role
          </p>
          <p className="text-xs sm:text-md font-sans font-semibold leading-7 tracking-normal text-gray-700">
            Deliverables
          </p>
          <p className="text-xs sm:text-md font-sans font-semibold leading-7 tracking-normal text-gray-700">
            Company
          </p>
          <p className="text-xs sm:text-md font-sans font-semibold leading-7 tracking-normal text-gray-700">
            Live
          </p>
        </div>
        <div className="flex flex-col gap-0 sm:gap-2">
          <p className="text-sm sm:text-lg font-serif font-normal leading-7 tracking-normal text-gray-700">
            {role}
          </p>
          <p className="text-sm sm:text-lg font-serif font-normal leading-7 tracking-normal text-gray-700">
            {deliverables}
          </p>
          <p className="text-sm sm:text-lg font-serif font-normal leading-7 tracking-normal text-gray-700">
            {client}
          </p>
          <p className="text-sm sm:text-lg font-serif font-normal leading-7 tracking-normal text-gray-700">
            {liveUrl}
          </p>
        </div>
      </div>

      <div className="my-4 border-t border-gray-300"></div>

      <article className="prose prose-quoteless prose-neutral md:prose-lg dark:prose-invert prose-h2:font-kasei dark:prose-a:text-neutral-500 pb-8">
        <MainMarkdown classStyle="flex flex-col gap-7" content={content} />
      </article>
    </div>
  );
};

export default WorkPage;
