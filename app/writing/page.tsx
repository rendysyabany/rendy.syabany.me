import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

interface PostData {
  data: {
    title: string;
    shortDescription: string;
    slug: string;
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
  // console.log(JSON.stringify(post));
  const postUrls = fs.readdirSync("content/posts/").map(filename => `/writing/${filename.replace(/\.md$/, '')}`);

  return (
    <div className="mx-5 flex flex-col gap-6">
      {post.map((data, i) => (
        <Link
          href={postUrls[i]}
          key={i}
          className="flex flex-col gap-0"
        >
          <div className="inline-flex flex-col items-start justify-start gap-2">
            <p className="font-sans text-md sm:text-lg font-semibold leading-6 tracking-normal text-gray-700">
              {data.data.title}
            </p>
            <p className="line-clamp-2 font-serif text-sm font-normal leading-normal tracking-normal text-gray-500">
              {data.data.shortDescription}
            </p>
            <p className="mt-2 font-serif text-sm font-normal leading-normal tracking-normal text-gray-700">
              Published on 07 November 2019,{" "}
              <span className="font-medium underline">Read more</span>
            </p>
          </div>
          <div className="my-4 border-t border-gray-300"></div>
        </Link>
      ))}
    </div>
  );
};
export default Writing;
