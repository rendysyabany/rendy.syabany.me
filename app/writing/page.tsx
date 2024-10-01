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
}

const getAllPostContents = (): PostData[] => {
  const folder = "content/posts/";
  const fileNames = fs.readdirSync(folder);
  const postContents: PostData[] = [];

  fileNames.forEach((fileName) => {
    if (fileName.endsWith(".md")) {
      const filePath = path.join(folder, fileName);
      const content = fs.readFileSync(filePath, "utf8");
      const matterResult = matter(content) as unknown as PostData;
      postContents.push(matterResult);
    }
  });

  return postContents;
};

const Writing = () => {
  const post = getAllPostContents();
  const postUrls = fs
    .readdirSync("content/posts/")
    .map((filename) => `/writing/${filename.replace(/\.md$/, "")}`);

  return (
    <>
      <div className="mx-5 flex flex-col gap-6">
        {post.map((data, i) => (
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
            {i !== post.length - 1 && (
              <div className="mx-auto mt-6 w-full border-t border-gray-300"></div>
            )}
          </Link>
        ))}
      </div>
    </>
  );
};
export default Writing;
