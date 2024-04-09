/* eslint-disable react/no-unescaped-entities */
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import MainMarkdown from "@/components/ui/markdown";
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
    { slug: "professional" },
  ];
};

export default function Content() {
  const slug = "professional"; // Slug for the homepage
  const filePath = `content/professional/${slug}.md`;

  const post = getPostContent(filePath);

  if (!post) {
    return <div>Content not found.</div>;
  }

  const data = post && post.data;

  const project = [
    {
      title: "Coming soon project case study",
      description: "here ini for project case study description...",
      category: [
        {
          title: "Mobile App",
        },
        {
          title: "Design System",
        },
      ],
      bgColor: "#F9F7E1",
    },
    {
      title: "Coming soon project case study",
      description: "here ini for project case study description...",
      category: [
        {
          title: "Mobile App",
        },
        {
          title: "Design System",
        },
      ],
      bgColor: "#FFE4E6",
    },
  ];

  return (
    <>
{/*       <div className="fixed bottom-0 max-w-[720px] z-10 w-full border-t border-gray-200 bg-gray-100 py-5 text-center">
        <Link
          href={data.resumeUrl}
          target="_blank"
        >
          <p className="font-sans text-xs font-medium leading-tight text-gray-700 sm:text-sm underline">
            Download Resume (PDF)
          </p>
        </Link>
      </div> */}

      <div className="mx-5 flex flex-col gap-8 pb-10">
        <div className="inline-flex h-auto w-full items-center justify-start gap-4">
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

        <div className="flex flex-wrap gap-2">
          {data.expertise.map(
            (
              tag: {
                bgColor: any;
                title: string;
              },
              i: Key | null | undefined,
            ) => (
              <Badge
                key={i}
                variant="secondary"
                style={{ backgroundColor: tag.bgColor }}
                className="font-sans font-medium text-gray-600"
              >
                {tag.title}
              </Badge>
            ),
          )}
        </div>

        <MainMarkdown content={data.about} />

        <div className="inline-flex h-auto w-fit flex-wrap items-center justify-start gap-4 rounded-md bg-neutral-100 p-3">
          {data.social.map(
            (soc: { socialUrl: string; socialIcon: any }, i: any) => (
              <Link key={i} href={soc.socialUrl}>
                <Image
                  src={soc.socialIcon}
                  alt={soc.socialUrl}
                  className="h-6 w-6 object-cover"
                  width={600}
                  height={600}
                />
              </Link>
            ),
          )}
        </div>

        <div className="my-4 border-t border-gray-300"></div>

        <div className="flex flex-col gap-8">
          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0">
            <p className="self-stretch font-sans text-xl font-semibold leading-loose text-gray-700">
              {data.productSectionTitle}
            </p>
            <p className="text-md mt-[-2px] self-stretch font-serif font-normal leading-snug text-gray-500">
              {data.productSectionDescription}
            </p>
          </div>

          <div className="grid h-auto w-full grid-cols-1 items-start justify-start gap-2.5 sm:grid-cols-2">
            {data.productItem.map(
              (
                product: {
                  productItemLogo: any;
                  productItemName: string;
                  productItemUrl: string;
                  productItemBgColor: string;
                },
                i: Key | null | undefined,
              ) => (
                <div
                  key={i}
                  className="flex h-auto w-full min-w-[260px] items-center justify-start gap-4 rounded-xl bg-gray-100 p-4"
                  style={{
                    backgroundColor:
                      product.productItemBgColor && product.productItemBgColor,
                  }}
                >
                  <Image
                    className="h-14 w-14 rounded-lg object-cover"
                    src={product.productItemLogo}
                    alt={product.productItemName}
                    width={600}
                    height={600}
                  />
                  <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0.5">
                    <div className="text-md self-stretch font-sans font-semibold leading-relaxed text-gray-700">
                      {product.productItemName}
                    </div>
                    <a
                      href={"https://" + product.productItemUrl}
                      className="text-sm font-medium leading-none text-gray-500 underline"
                    >
                      {product.productItemUrl}
                    </a>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="my-4 border-t border-gray-300"></div>

        <div className="flex flex-col gap-8">
          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0">
            <p className="self-stretch font-sans text-xl font-semibold leading-loose text-gray-700">
              Selected Works.
            </p>
            <p className="text-md mt-[-2px] self-stretch font-serif font-normal leading-snug text-gray-500">
              Elevating excellence through my selected work.
            </p>
          </div>

          <div className="flex h-auto w-full flex-col flex-wrap items-start justify-start gap-2.5">
            {project.map((project, i) => (
              <div
                key={i}
                className="inline-flex h-auto w-full flex-col items-start justify-start gap-4 rounded-xl bg-emerald-50 p-5"
                style={{ backgroundColor: project.bgColor }}
              >
                <div className="flex h-auto flex-col items-start justify-start gap-0 self-stretch">
                  <div className="text-md self-stretch font-sans font-semibold leading-normal text-gray-700">
                    {project.title}
                  </div>
                  <div className="self-stretch font-serif text-sm font-normal leading-normal text-gray-500">
                    {project.description}
                  </div>
                </div>
                <div className="inline-flex flex-wrap items-start justify-start gap-2.5 self-stretch">
                  {project.category.map((category, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-white font-medium text-gray-600"
                    >
                      {category.title}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {data.designGallery.map(
              (shot: { caption: string; item: any }, i: any) => (
                <div key={i} className="col-span-1 row-span-1">
                  <AspectRatio className="z-0" ratio={1 / 1}>
                    <Image
                      src={shot.item}
                      alt={shot.caption}
                      className="rounded-xl object-cover"
                      fill
                    />
                  </AspectRatio>
                </div>
              ),
            )}
          </div>
        </div>

{/*         <div className="my-4 border-t border-gray-300"></div>

        <div className="flex flex-col gap-8">
          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0">
            <p className="self-stretch font-sans text-xl font-semibold leading-loose text-gray-700">
              {data.gearSectionTitle}
            </p>
            <p className="text-md mt-[-2px] self-stretch font-serif font-normal leading-snug text-gray-500">
              {data.gearSectionDescription}
            </p>
          </div>

          <div className="grid h-auto w-full grid-cols-2 items-start justify-start gap-2.5 sm:grid-cols-4">
            {data.gearItem.map(
              (
                gear: {
                  gearItemLogo: any;
                  gearItemName: string;
                  gearItemDescription: string;
                },
                i: any,
              ) => (
                <div
                  key={i}
                  className="inline-flex h-auto w-full min-w-[140px] flex-col items-center justify-center gap-1.5 rounded-lg bg-neutral-100 px-3.5 py-4"
                >
                  <Image
                    className="h-12 w-12 rounded-lg"
                    src={gear.gearItemLogo}
                    alt={gear.gearItemName}
                    width={600}
                    height={600}
                  />
                  <div className="flex flex-col items-center justify-center font-sans">
                    <div className="text-base font-semibold text-gray-700">
                      {gear.gearItemName}
                    </div>
                    <div className="text-center text-xs font-normal text-gray-500">
                      {gear.gearItemDescription}
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div> */}

        <div className="my-4 border-t border-gray-300"></div>
        <div className="flex flex-col gap-8">
          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0">
            <p className="self-stretch font-sans text-xl font-semibold leading-loose text-gray-700">
              {data.deskSectionTitle}
            </p>
            <p className="text-md mt-[-2px] self-stretch font-serif font-normal leading-snug text-gray-500">
              {data.deskSectionDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {data.deskGallery.map(
              (
                shot: { deskGalleryCaption: string; deskGalleryItem: any },
                i: any,
              ) => (
                <div key={i} className="col-span-1 row-span-1">
                  <AspectRatio className="z-0" ratio={1 / 1}>
                    <Image
                      src={shot.deskGalleryItem}
                      alt={shot.deskGalleryCaption}
                      className="rounded-xl object-cover"
                      fill
                    />
                  </AspectRatio>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </>
  );
}
