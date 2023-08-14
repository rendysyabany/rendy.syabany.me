import matter from "gray-matter";
import { Key, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import fs from "fs";
import getPostMetadata from "@/components/getPostMetadata";
import Image from "next/image";


interface ImageData {
  galleryItem: string;
  caption: string;
}

const getPostContent = (filePath: string) => {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const matterResult = matter(content);
    return matterResult;
  } catch (error) {
    // console.error("Error reading post content:", error);
    return null;
  }
};

export const generateStaticParams = async () => {
  return [
    // Return the slug for the homepage
    { slug: "home" },
  ];
};

export default function Content() {
  const slug = "home"; // Slug for the homepage
  const filePath = `content/home/${slug}.md`;

  const post = getPostContent(filePath);

  if (!post) {
    return <div>Content not found.</div>;
  }

  const {
    data: { avatar, firstName, lastName, description, about, gallery }
  } = post;

  // console.log(post.data)

  // const avatar =
  //   "https://pbs.twimg.com/profile_images/1526474082434199552/DyPn7nem_400x400.jpg";

  return (
    <div className="mx-5 flex flex-col gap-8">
      <div className="inline-flex h-auto w-full items-center justify-start gap-4">
        <img className="h-16 w-16 rounded-full" src={avatar} />
        <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0">
          <div className="self-stretch">
            <span className="font-sans text-xl font-semibold leading-loose text-gray-700">
              {firstName}{" "}
            </span>
            <span className="font-sans text-xl font-light leading-loose text-gray-700">
              {lastName}
            </span>
          </div>
          <div className="self-stretch text-base font-normal leading-snug text-gray-500 mt-[-2px]">
            {description}
          </div>
        </div>
      </div>

      <div className="">
        <p className="text-lg self-stretch font-serif font-normal leading-normal tracking-normal text-gray-600">
          <span>
            {about}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="row-span-2">
          <Image
            src={gallery[0].galleryItem}
            alt={gallery[0].caption}
            width={400}
            height={400}
            className="h-full w-full object-cover rounded-xl"
          />
        </div>
        {gallery.slice(1).map((image: ImageData, i: number) => (
          <div key={i} className="col-span-1 row-span-1">
            <Image
              src={image.galleryItem}
              alt={image.caption}
              width={400}
              height={400}
              className="h-[160px] w-full object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

