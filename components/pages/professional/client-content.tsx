"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import MainMarkdown from "@/components/ui/markdown";
import Image from "next/image";
import Link from "next/link";
import { Key } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Marquee from "@/components/magicui/marquee";

interface ImageData {
  galleryItem: string;
  caption: string;
}

export interface Product {
  productItemLogo: string;
  productItemName: string;
  productItemUrl: string;
  productItemBgColor: string;
  productDescription: string;
  productScreenshot?: string;
}

export interface GearItem {
  gearItemLogo: string;
  gearItemName: string;
  gearItemDescription: string;
}

export interface SocialItem {
  socialUrl: string;
  socialIcon: string;
}

export interface ProfessionalData {
  avatar: string;
  firstName: string;
  lastName: string;
  description: string;
  expertise: Array<{ title: string; bgColor: string }>;
  about: string;
  social?: SocialItem[];
  resumeUrl?: string;
  productSectionTitle: string;
  productSectionDescription: string;
  productItem: Product[];
  clientSectionTitle: string;
  clientSectionDescription: string;
  clientHeroImage: string;
  clients: Array<{ name: string; logo: string }>;
  serviceItem: Array<{ title: string; description: string }>;
  gearSectionTitle?: string;
  gearSectionDescription?: string;
  gearItem?: GearItem[];
  deskSectionTitle: string;
  deskSectionDescription: string;
  deskGallery: Array<{ deskGalleryCaption: string; deskGalleryItem: string }>;
}

export interface ClientContentProps {
  data: ProfessionalData;
  gallery: ImageData[];
}

export default function ClientContent({ data, gallery }: ClientContentProps) {
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
    <div className="w-full px-4 sm:px-0">
      <motion.div 
        className="flex flex-col gap-8 pb-10"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        <motion.div 
          className="sticky top-0 z-20 bg-white/90 py-4 backdrop-blur-sm"
          variants={stickyHeaderVariants}
          initial="initial"
          animate="animate"
        >
          <div className="inline-flex h-auto w-full items-center justify-start gap-4">
            <motion.img
              className="h-14 w-14 rounded-full sm:h-16 sm:w-16"
              src={data.avatar}
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
          {data?.expertise?.map(
            (
              tag: {
                bgColor: string;
                title: string;
              },
              i: number,
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
          <MainMarkdown content={data?.about || ""} />
        </motion.div>

        <motion.div className="grid grid-cols-2 gap-2 sm:grid-cols-3" variants={containerVariants}>
          {gallery && gallery.length > 0 && (
            <motion.div className="row-span-2" variants={itemVariants}>
              <Image
                src={gallery[0].galleryItem}
                alt={gallery[0].caption}
                width={400}
                height={400}
                className="h-full w-full rounded-xl object-cover transition-transform duration-300"
              />
            </motion.div>
          )}
          {gallery && gallery.slice(1).map((image: ImageData, i: number) => (
            <motion.div key={i} className="col-span-1 row-span-1" variants={itemVariants}>
              <Image
                src={image.galleryItem}
                alt={image.caption}
                width={400}
                height={400}
                className="h-full max-h-[160px] w-full rounded-xl object-cover sm:h-[160px] transition-transform duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-4 mb-0 border-t border-gray-300" variants={fadeInVariants}></motion.div>

        <motion.div className="flex flex-col gap-8" variants={containerVariants}>
          <motion.div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0" variants={itemVariants}>
            <p className="self-stretch font-sans text-xl font-semibold leading-loose text-gray-700">
              {data?.productSectionTitle}
            </p>
            <p className="text-sm mt-[-2px] self-stretch font-sans font-normal leading-snug text-gray-500">
              {data?.productSectionDescription}
            </p>
          </motion.div>

          <div className="grid h-auto w-full grid-cols-1 items-stretch justify-start gap-4 sm:grid-cols-2">
            {data?.productItem?.map(
              (
                product: Product,
                i: number,
              ) => (
                <motion.a
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.98 }}
                  href={"https://" + product.productItemUrl}
                  target="_blank"
                  className="group relative flex h-full w-full min-w-[260px] flex-col items-start justify-between gap-0 overflow-hidden rounded-2xl border border-black/5 p-0 transition-all hover:border-black/20 hover:shadow-sm"
                  style={{
                    backgroundColor:
                      product.productItemBgColor && product.productItemBgColor,
                  }}
                >
                  <div className="relative w-full overflow-hidden pt-4 px-4">
                    <div className="relative h-40 w-full overflow-hidden rounded-xl border border-black/5 shadow-sm transition-all duration-500">
                      {product.productScreenshot ? (
                        <Image
                          src={product.productScreenshot}
                          alt={product.productItemName}
                          fill
                          className="object-cover object-top"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-white/50">
                          <Image
                            className="h-12 w-12 opacity-20"
                            src={product.productItemLogo}
                            alt={product.productItemName}
                            width={48}
                            height={48}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex w-full flex-col gap-4 p-6">
                    <div className="flex w-full items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-black/5">
                        <Image
                          className="h-full w-full object-contain"
                          src={product.productItemLogo}
                          alt={product.productItemName}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="rounded-full bg-black/5 p-1.5 transition-all group-hover:bg-black group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="text-lg font-sans font-bold leading-tight text-gray-900 group-hover:text-black">
                        {product.productItemName}
                      </div>
                      <p className="text-[13px] font-sans font-normal leading-relaxed text-gray-600 line-clamp-2">
                        {product.productDescription}
                      </p>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">
                        Launch App
                      </span>
                      <div className="h-[1px] w-6 bg-gray-200 transition-all group-hover:w-10 group-hover:bg-gray-900" />
                    </div>
                  </div>
                </motion.a>
              ),
            )}
          </div>
        </motion.div>

        <motion.div className="mt-4 mb-0 border-t border-gray-300" variants={fadeInVariants}></motion.div>

        <motion.div className="flex flex-col gap-8" variants={containerVariants}>
          <div className="grid grid-cols-1 gap-6">
            <motion.div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0" variants={itemVariants}>
              <p className="self-stretch font-sans text-xl font-semibold leading-loose text-gray-700">
                {data?.clientSectionTitle}
              </p>
              <p className="text-sm mt-[-2px] self-stretch font-sans font-normal leading-snug text-gray-500">
                {data?.clientSectionDescription}
              </p>
            </motion.div>
            <motion.div className="space-y-4" variants={itemVariants}>
              <div className="relative h-[200px] w-full overflow-hidden rounded-3xl sm:h-[300px]">
                {data?.clientHeroImage && (
                  <Image
                    src={data.clientHeroImage}
                    alt="Partners and Clients"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 items-center sm:grid-cols-3 md:grid-cols-4 sm:gap-8">
              {data?.clients?.map((client: any, i: number) => (
                <motion.div 
                  key={i} 
                  className="mx-auto flex w-full items-center justify-center p-4"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={120}
                    height={60}
                    className="aspect-[2/1] w-full max-w-[120px] object-contain opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="relative -mx-4 mt-4 flex h-full w-[calc(100%+2rem)] flex-col items-center justify-center overflow-x-auto pb-0 no-scrollbar sm:-mx-0 sm:w-full sm:rounded-2xl"
            variants={itemVariants}
          >
            <Marquee pauseOnHover className="[--duration:40s] py-4">
              {data?.serviceItem?.map((service: any, i: number) => (
                <div 
                  key={i} 
                  className="mx-4 flex h-full w-[280px] flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all sm:w-[320px]"
                >
                  <p className="font-sans text-lg font-bold text-gray-800">
                    {service.title}
                  </p>
                  <p className="font-sans text-sm leading-relaxed text-gray-500">
                    {service.description}
                  </p>
                </div>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white sm:rounded-l-2xl"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white sm:rounded-r-2xl"></div>
          </motion.div>
        </motion.div>

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
                shot: { deskGalleryCaption: string; deskGalleryItem: string },
                i: number,
              ) => (
                <motion.div key={i} className="col-span-1 row-span-1" variants={itemVariants}>
                  <AspectRatio className="z-0" ratio={1 / 1}>
                    <Image
                      src={shot.deskGalleryItem}
                      alt={shot.deskGalleryCaption}
                      className="rounded-xl object-cover transition-transform duration-300"
                      fill
                    />
                  </AspectRatio>
                </motion.div>
              ),
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}