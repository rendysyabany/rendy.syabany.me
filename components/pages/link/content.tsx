/* eslint-disable react/no-unescaped-entities */
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import fs from "fs";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import Link from "next/link";
import { Key } from "react";

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
    { slug: "link" },
  ];
};

export default function Content() {
  const slug = "link"; // Slug for the homepage
  const filePath = `content/link/${slug}.md`;

  const post = getPostContent(filePath);

  if (!post) {
    return <div>Content not found.</div>;
  }

  const data = post && post.data;

  return (
    <div className="flex flex-col w-full items-center justify-center px-4">
      <div className="flex flex-col w-full max-w-[460px] gap-2 justify-center">
        <div className="flex h-auto w-full items-center justify-start gap-4">
          <img
            className="h-14 w-14 rounded-full sm:h-16 sm:w-16"
            src={data.avatar}
          />
          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0">
            <div className="self-stretch">
              <p className="text-md font-sans font-semibold leading-loose text-gray-700 sm:text-xl">
                {data.firstName}{" "}
                <span className="font-light">{data.lastName}</span>
              </p>
            </div>
            <div className="mt-[-2px] self-stretch text-sm font-normal leading-normal text-gray-500 sm:text-base">
              {data.description}
            </div>
          </div>
        </div>

        {/* <div className="my-4 border-t border-gray-300"></div> */}

        <div className="mt-6 flex flex-col justify-center gap-8">
          <div className="grid h-auto w-full grid-cols-1 items-start justify-center gap-4">
            {data.link.map(
              (
                linkItem: {
                  linkImage: any;
                  linkTitle: string;
                  linkUrl: string;
                },
                i: Key | null | undefined,
              ) => (
                <Link
                  key={i}
                  href={"https://" + linkItem.linkUrl}
                  target="_blank"
                  className="flex h-auto w-full min-w-[260px] flex-col items-center justify-start gap-0 overflow-hidden rounded-xl bg-gray-100"
                  // style={{
                  //   backgroundColor:
                  //     product.productItemBgColor && product.productItemBgColor,
                  // }}
                >
                  {linkItem.linkImage && (
                    <AspectRatio className="z-0" ratio={1 / 1}>
                      <Image
                        className="h-full w-full object-cover"
                        src={linkItem.linkImage}
                        alt={linkItem.linkTitle}
                        width={600}
                        height={600}
                      />
                    </AspectRatio>
                  )}
                  <div className="inline-flex w-full shrink grow basis-0 flex-col flex-wrap flex-wrap items-start justify-start gap-0.5 p-4">
                    <div className="text-md self-stretch font-sans font-semibold leading-relaxed text-gray-700">
                      {linkItem.linkTitle}
                    </div>
                    <p className="text-sm font-medium leading-none text-gray-500 underline">
                      {linkItem.linkUrl}
                    </p>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
