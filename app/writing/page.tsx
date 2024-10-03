import { format } from "date-fns";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";

import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Rendyansyah Syabany | Writing',
  description: 'Digital Product Designer & Builder',
}

interface PostData {
  data: {
    title: string;
    shortDescription: string;
    slug: string;
    datePublished: any;
    // Add more properties as needed
  };
  content: string;
}

const getAllPostContents = (): { postContents: PostData[], postUrls: string[] } => {
  const folder = "content/posts/";
  const fileNames = fs.readdirSync(folder);
  const postContents: PostData[] = [];
  const postUrls: string[] = [];

  fileNames.forEach((fileName) => {
    if (fileName.endsWith(".md")) {
      const filePath = path.join(folder, fileName);
      const content = fs.readFileSync(filePath, "utf8");
      const matterResult = matter(content) as unknown as PostData;

      postContents.push(matterResult);
      postUrls.push(`/writing/${fileName.replace(/\.md$/, "")}`);
    }
  });

  // Sort both posts and URLs by datePublished (latest first)
  const sortedPosts = postContents
    .map((post, index) => ({ post, url: postUrls[index] }))
    .sort((a, b) => {
      return new Date(b.post.data.datePublished).getTime() - new Date(a.post.data.datePublished).getTime();
    });

  // Separate the sorted posts and URLs
  return {
    postContents: sortedPosts.map(item => item.post),
    postUrls: sortedPosts.map(item => item.url),
  };
};

const Writing = () => {
  const { postContents, postUrls } = getAllPostContents();

  return (
    <>
      <div className="mx-5 flex flex-col gap-6">
        {postContents.map((data, i) => (
          <Link href={postUrls[i]} key={i} className="flex flex-col gap-0">
            <div className="inline-flex flex-col items-start justify-start gap-2">
              <p className="text-md font-sans font-semibold leading-6 tracking-normal text-gray-700 sm:text-lg">
                {data.data.title}
              </p>
              <p className="line-clamp-2 font-sans text-sm font-normal leading-normal tracking-normal text-gray-500">
                {data.data.shortDescription}
              </p>
              <p className="mt-2 font-sans text-xs sm:text-sm font-normal leading-normal tracking-normal text-gray-700">
                Published on{" "}
                {format(new Date(data.data.datePublished), "dd MMMM yyyy")},{" "}
                <span className="font-medium underline">Read more</span>
              </p>
            </div>
            {i !== postContents.length - 1 && (
              <div className="mx-auto mt-6 w-full border-t border-gray-300"></div>
            )}
          </Link>
        ))}
      </div>
    </>
  );
};
export default Writing;
