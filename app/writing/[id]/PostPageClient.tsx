"use client"; // This marks the component as a Client Component

import MainMarkdown from "@/components/ui/markdown";
import { format } from "date-fns";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const PostPageClient = ({ post }: any) => {
  const { id, data: { title, shortDescription, datePublished, imageUrl }, content } = post;

  return (
    <div className="flex flex-col">
      <div className="mx-5 flex flex-col gap-6">
        <div className="flex flex-col gap-8">
          <div className="inline-flex flex-col items-start justify-start gap-4">
            <p className="mb-2 font-serif text-sm font-normal leading-normal tracking-normal text-gray-500">
              Published on {format(new Date(datePublished), "dd MMMM yyyy")}
            </p>
            <h1 className="font-sans text-xl font-semibold leading-7 tracking-normal text-gray-700 sm:text-3xl sm:leading-9">
              {title}
            </h1>
            <h3 className="text-md font-serif font-normal leading-normal tracking-normal text-gray-500">
              {shortDescription}
            </h3>
          </div>
          
          {/* Featured Image */}
          {imageUrl && (
            <div className="w-full relative h-auto">
              <Image
                src={imageUrl}
                alt={title}
                width={800}
                height={500}
                className="rounded-lg object-cover w-full h-auto max-h-[500px]"
                priority={true}
              />
            </div>
          )}
        </div>

        <div className="my-4 border-t border-gray-300"></div>

        <article className="prose prose-neutral md:prose-lg dark:prose-invert pb-8 max-w-none">
          <MainMarkdown classStyle="flex flex-col gap-4 self-stretch font-serif text-gray-800" content={content} />
        </article>
      </div>

      <div className="mx-5 my-8 flex items-center justify-center">
         <Link 
            href={`https://syabany.com/post/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 transition-colors hover:bg-gray-100 text-gray-600 hover:text-gray-900"
         >
            <span className="font-sans font-medium">Read Original Post</span>
            <ExternalLinkIcon className="h-4 w-4" />
         </Link>
      </div>
    </div>
  );
};

export default PostPageClient;
