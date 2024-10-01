"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Comments } from "@/components/ui/comments";
import MainMarkdown from "@/components/ui/markdown";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import { HeartIcon } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // For better confetti responsiveness

type Post = {
  data: { title: any; shortDescription: any; datePublished: any; };
  content: string;
};

const PostPageClient = () => {
  const path = usePathname();
  const slug = useMemo(() => path.split("/").pop(), [path]); // Memoize the slug to avoid recalculating

  const [post, setPost] = useState<Post | null>(null);
  const [claps, setClaps] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize(); // For responsive confetti

  // Fetch post content and claps count
  useEffect(() => {
    if (!slug) return;

    const fetchPostData = async () => {
      try {
        const [postRes, clapsRes] = await Promise.all([
          fetch(`/api/post/${slug}`),
          fetch(`/api/clap/${slug}`),
        ]);

        if (!postRes.ok || !clapsRes.ok) {
          console.error("Failed to fetch post or claps:", postRes.statusText, clapsRes.statusText);
          return;
        }

        const postData = await postRes.json();
        const clapsData = await clapsRes.json();

        setPost(postData);
        setClaps(clapsData.claps);
      } catch (error) {
        console.error("Error fetching post and claps:", error);
      }
    };

    fetchPostData();
  }, [slug]);

  // Handle claps click
  const handleClap = useCallback(async () => {
    if (!slug) return;

    try {
      const response = await fetch(`/api/clap/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

      if (response.ok) {
        const updatedClaps = await response.json();
        setClaps(updatedClaps.claps);
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
    return <div className="w-full flex align-middle justify-center items-center"><p>Loading post content...</p></div>;
  }

  const { content } = post;
  const { title, shortDescription, datePublished } = post?.data;

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
        </div>

        <div className="my-4 border-t border-gray-300"></div>

        <article className="prose prose-quoteless prose-neutral md:prose-lg dark:prose-invert prose-h2:font-kasei dark:prose-a:text-neutral-500 pb-8">
          <MainMarkdown classStyle="flex flex-col gap-2" content={content} />
        </article>
      </div>

      <div className="mx-5 my-4 flex items-center justify-center">
        <span
          onClick={handleClap}
          className="cursor-pointer text-red-500 hover:text-red-700 transition duration-200"
        >
          <HeartIcon className="w-7 h-7" />
        </span>
        <p className="ml-2 text-gray-600 text-2xl font-medium">{claps}</p>
      </div>

      {/* {showConfetti && <Confetti width={width} height={height} />} */}
    </div>
  );
};

export default PostPageClient;
