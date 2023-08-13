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
    data: { firstName, lastName, description, about, gallery }
  } = post;

  console.log(post.data)

  const avatar =
    "https://pbs.twimg.com/profile_images/1526474082434199552/DyPn7nem_400x400.jpg";
  const images = [
    {
      id: 1,
      src: "https://picsum.photos/id/1018/600/800",
      alt: "First Image",
      // colSpan: 2,
      rowSpan: 2,
    },
    {
      id: 2,
      src: "https://picsum.photos/id/1015/600/800",
      alt: "Second Image",
    },
    {
      id: 3,
      src: "https://picsum.photos/id/1020/600/800",
      alt: "Third Image",
    },
    {
      id: 4,
      src: "https://picsum.photos/id/1019/600/800",
      alt: "Fourth Image",
    },
    {
      id: 5,
      src: "https://picsum.photos/id/1016/600/800",
      alt: "Fifth Image",
    },
    {
      id: 6,
      src: "https://picsum.photos/id/1021/600/800",
      alt: "Sixth Image",
    },
    {
      id: 7,
      src: "https://picsum.photos/id/1022/600/800",
      alt: "Seventh Image",
    },
    {
      id: 8,
      src: "https://picsum.photos/id/1023/600/800",
      alt: "Eighth Image",
    },
  ];

  return (
    <div className="mx-5 flex flex-col gap-8">
      <div className="inline-flex h-20 w-96 items-center justify-start gap-4">
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

