"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Comments } from "@/components/ui/comments";
import MainMarkdown from "@/components/ui/markdown";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import { HeartIcon, ThumbsUpIcon } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // For better confetti responsiveness
import Head from "next/head";


type Post = {
  data: { title: any; shortDescription: any; datePublished: any; };
  content: string;
};

const PostPageClient = () => {
  const path = usePathname();
  const slug = useMemo(() => path.split("/").pop(), [path]); // Memoize the slug to avoid recalculating

  const [post, setPost] = useState<Post | null>(null);
  const [claps, setClaps] = useState<number | null>(null); // Use null to indicate loading state
  
  const [clapIsvalidation, setClapsIsvalidation] = useState(false); // Use null to indicate loading state

  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize(); // For responsive confetti

  // Fetch post content
  useEffect(() => {
    if (!slug) return;

    const fetchPostData = async () => {
      try {
        const postRes = await fetch(`/api/post/${slug}`);
        if (!postRes.ok) {
          console.error("Failed to fetch post:", postRes.statusText);
          return;
        }

        const postData = await postRes.json();
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPostData();
  }, [slug]);

  // Fetch claps count
  useEffect(() => {
    if (!slug) return;

    const fetchClapsData = async () => {
      try {
        const clapsRes = await fetch(`/api/clap/${slug}`);
        if (!clapsRes.ok) {
          console.error("Failed to fetch claps:", clapsRes.statusText);
          return;
        }

        const clapsData = await clapsRes.json();
        setClaps(clapsData.claps);
      } catch (error) {
        console.error("Error fetching claps:", error);
      }
    };

    fetchClapsData();
  }, [slug]);

  // Handle claps click
  const handleClap = useCallback(async () => {
    if (!slug) return;
    setClapsIsvalidation(true)

    try {
      const response = await fetch(`/api/clap/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

      if (response.ok) {
        const updatedClaps = await response.json();
        setClaps(updatedClaps.claps);
        setClapsIsvalidation(false)
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000); // Auto-hide confetti after 3 seconds
      } else {
        console.error("Failed to register clap:", response.statusText);
      }
    } catch (error) {
      console.error("Error during clapping:", error);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="w-full flex align-middle justify-center items-center">
        <p>Loading post content...</p>
      </div>
    );
  }

  const { content } = post;
  const { title, shortDescription, datePublished } = post?.data;

  return (
    <>
      <head>
        <title>{post?.data.title || 'Rendyansyah Syabany | Writing'}</title>
        <meta name="description" content={post?.data.shortDescription || 'Personal Website'} />
      </head>

      <div className="flex flex-col">
        <div className="mx-5 flex flex-col gap-6">
          <div className="flex flex-col gap-8">
            <div className="inline-flex flex-col items-start justify-start gap-4">
              <p className="mb-2 font-sans text-xs sm:text-sm font-normal leading-normal tracking-normal text-gray-500">
                Published on {format(new Date(datePublished), "dd MMMM yyyy")}
              </p>
              <h1 className="font-sans text-2xl font-bold leading-8 tracking-normal text-gray-700 sm:text-4xl sm:leading-10">
                {title}
              </h1>
              <h3 className="text-sm font-sans font-normal leading-normal tracking-normal text-gray-500">
                {shortDescription}
              </h3>
            </div>
          </div>

          <div className="my-4 border-t border-gray-300"></div>

          <article className="prose prose-quoteless prose-neutral md:prose-lg dark:prose-invert prose-h2:font-kasei dark:prose-a:text-neutral-500 pb-8">
            <MainMarkdown classStyle="flex flex-col gap-2" content={content} />
          </article>
        </div>

        <div className="mx-5 my-4 flex items-center justify-center">
          {claps === null ? (
            <p>Loading claps...</p> // Show loading for claps
          ) : (
            <>
              <span
                onClick={handleClap}
                className="cursor-pointer text-blue-500 hover:text-blue-700 transition duration-200"
              >
                <ThumbsUpIcon className="w-7 h-7" />
              </span>
              <p className="mt-1 ml-2 text-gray-600 text-2xl font-medium">{clapIsvalidation ? "Loading.. " : claps}</p>
            </>
          )}
        </div>

        {/* {showConfetti && <Confetti width={width} height={height} />} */}
      </div>
    </>
  );
};

export default PostPageClient;
