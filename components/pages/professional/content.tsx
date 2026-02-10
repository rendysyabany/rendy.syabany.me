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
import { motion } from "framer-motion";

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
    { slug: "professional" },
  ];
};

export default function Content() {
  const slug = "professional"; // Slug for the homepage
  const filePath = `content/professional/${slug}.md`;
  const gelleryPath = `content/home/home.md`;

  const post = getPostContent(filePath);

  const galleryData = getPostContent(gelleryPath);
  const gallery = galleryData && galleryData.data.gallery;

  if (!post) {
    return <div>Content not found.</div>;
  }

  const data = post && post.data;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const stickyHeaderVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

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

      <motion.div 
        className="mx-5 flex flex-col gap-8 pb-10"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        <motion.div 
          className="sticky top-0 z-20 -mx-5 bg-white/90 px-5 py-4 backdrop-blur-sm"
          variants={stickyHeaderVariants}
          initial="initial"
          animate="animate"
        >
          <div className="inline-flex h-auto w-full items-center justify-start gap-4">
            <motion.img
              className="h-14 w-14 rounded-full sm:h-16 sm:w-16"
              src={data.avatar}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0">
              <div className="self-stretch">
                <p className="text-md font-sans font-semibold leading-loose text-gray-700 sm:text-xl">
                  {data.firstName}{" "}
                  <span className="font-light">{data.lastName}</span>
                </p>
              </div>
              <div className="font-sans mt-[-2px] sm:mt-[2px] self-stretch text-[13px] font-normal leading-normal text-gray-500 sm:text-md">
                {data.description}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="flex flex-wrap gap-2" variants={itemVariants}>
          {data.expertise.map(
            (
              tag: {
                bgColor: any;
                title: string;
              },
              i: Key | null | undefined,
            ) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant="secondary"
                  style={{ backgroundColor: tag.bgColor }}
                  className="font-sans font-medium text-gray-600 cursor-default"
                >
                  {tag.title}
                </Badge>
              </motion.div>
            ),
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <MainMarkdown content={data.about} />
        </motion.div>

        <motion.div className="grid grid-cols-2 gap-2 sm:grid-cols-3" variants={containerVariants}>
          <motion.div className="row-span-2" variants={itemVariants}>
            <Image
              src={gallery[0].galleryItem}
              alt={gallery[0].caption}
              width={400}
              height={400}
              className="h-full w-full rounded-xl object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
          </motion.div>
          {gallery.slice(1).map((image: ImageData, i: number) => (
            <motion.div key={i} className="col-span-1 row-span-1" variants={itemVariants}>
              <Image
                src={image.galleryItem}
                alt={image.caption}
                width={400}
                height={400}
                className="h-full max-h-[160px] w-full rounded-xl object-cover sm:h-[160px] transition-transform duration-300 hover:scale-[1.02]"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-4 mb-0 border-t border-gray-300" variants={fadeInVariants}></motion.div>

        <motion.div className="flex flex-col gap-8" variants={containerVariants}>
          <motion.div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0" variants={itemVariants}>
            <p className="self-stretch font-sans text-xl font-semibold leading-loose text-gray-700">
              {data.productSectionTitle}
            </p>
            <p className="text-sm mt-[-2px] self-stretch font-sans font-normal leading-snug text-gray-500">
              {data.productSectionDescription}
            </p>
          </motion.div>

          <div className="grid h-auto w-full grid-cols-1 items-start justify-start gap-2.5 sm:grid-cols-2">
            {data.productItem.map(
              (
                product: {
                  productItemLogo: any;
                  productItemName: string;
                  productItemUrl: string;
                  productItemBgColor: string;
                  productDescription: string;
                },
                i: Key | null | undefined,
              ) => (
                <motion.a
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={"https://" + product.productItemUrl}
                  target="_blank"
                  className="flex h-auto w-full min-w-[260px] items-center justify-start gap-4 rounded-xl bg-gray-100 p-4 transition-colors"
                  style={{
                    backgroundColor:
                      product.productItemBgColor && product.productItemBgColor,
                  }}
                >
                  <Image
                    className="h-14 w-14 rounded-full object-cover"
                    src={product.productItemLogo}
                    alt={product.productItemName}
                    width={600}
                    height={600}
                  />
                  <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0.5">
                    <div className="text-md self-stretch font-sans font-semibold leading-relaxed text-gray-700">
                      {product.productItemName}
                    </div>
                    <p className="text-[12.5px] font-sans font-normal leading-[135%] text-gray-500"
                    >
                      {product.productDescription}
                    </p>
                    {/* <a
                      href={"https://" + product.productItemUrl}
                      className="text-xs font-sans font-normal leading-none text-gray-500 underline"
                    >
                      www.{product.productItemUrl}
                    </a> */}
                  </div>
                </motion.a>
              ),
            )}
          </div>
        </motion.div>

        {/* <div className="my-4 border-t border-gray-300"></div>

        <div className="flex flex-col gap-8">
          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0">
            <p className="self-stretch font-sans text-xl font-semibold leading-loose text-gray-700">
              Selected Works.
            </p>
            <p className="text-sm mt-[-2px] self-stretch font-sans font-normal leading-snug text-gray-500">
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
                  <div className="self-stretch font-sans text-xs font-normal leading-normal text-gray-500">
                    {project.description}
                  </div>
                </div>
                <div className="inline-flex flex-wrap items-start justify-start gap-2.5 self-stretch">
                  {project.category.map((category, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-white font-sans font-medium text-gray-600"
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
        </div> */}

        {/* <div className="my-4 border-t border-gray-300"></div>

        <div className="flex flex-col gap-8">
          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0">
            <p className="self-stretch font-sans text-xl font-semibold leading-loose text-gray-700">
              {data.gearSectionTitle}
            </p>
            <p className="text-sm mt-[-2px] self-stretch font-sans font-normal leading-snug text-gray-500">
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

        <motion.div className="mt-4 mb-0 border-t border-gray-300" variants={fadeInVariants}></motion.div>

        <motion.div className="flex flex-col gap-8" variants={containerVariants}>
          <motion.div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0" variants={itemVariants}>
            <p className="self-stretch font-sans text-xl font-semibold leading-loose text-gray-700">
              {data.deskSectionTitle}
            </p>
            <p className="text-sm mt-[-2px] self-stretch font-sans font-normal leading-snug text-gray-500">
              {data.deskSectionDescription}
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-2 gap-2 sm:grid-cols-3" variants={containerVariants}>
            {data.deskGallery.map(
              (
                shot: { deskGalleryCaption: string; deskGalleryItem: any },
                i: any,
              ) => (
                <motion.div key={i} className="col-span-1 row-span-1" variants={itemVariants}>
                  <AspectRatio className="z-0" ratio={1 / 1}>
                    <Image
                      src={shot.deskGalleryItem}
                      alt={shot.deskGalleryCaption}
                      className="rounded-xl object-cover transition-transform duration-300 hover:scale-[1.02]"
                      fill
                    />
                  </AspectRatio>
                </motion.div>
              ),
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
