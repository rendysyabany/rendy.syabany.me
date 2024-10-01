"use client"; // This marks the component as a Client Component

import { useState, useEffect } from "react";
import { Comments } from "@/components/ui/comments";
import MainMarkdown from "@/components/ui/markdown";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import { HeartIcon } from "lucide-react";
import Confetti from 'react-confetti'; // Import the Confetti component



const PostPageClient = ({ post }: any) => {
  const { data: { title, shortDescription, datePublished }, content } = post;
  const [claps, setClaps] = useState(0); // Initialize claps as 0
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti
  const path = usePathname(); // Get the current path

  // Extract the slug from the path
  const slug = path.split('/').pop(); // Get the last part of the path

  // Fetch the claps when the component mounts
  useEffect(() => {
    const fetchClaps = async () => {
      if (!slug) {
        console.error("Slug is missing from the URL");
        return;
      }
  
      try {
        const response = await fetch(`/api/clap/${slug}`); // Ensure this path is correct
        if (response.ok) {
          const data = await response.json();
          setClaps(data.claps); // Update claps state
        } else {
          console.error("Failed to fetch claps:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching claps:", error);
      }
    };
  
    fetchClaps();
  }, [slug]); // Fetch claps when slug changes
  

  const handleClap = async () => {
    if (!slug) {
      console.error("Slug is missing from the URL");
      return;
    }

    const response = await fetch(`/api/clap/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }), // Send the slug to the API for clapping
    });

    if (response.ok) {
      const updatedPost = await response.json();
      setClaps(updatedPost.claps); // Update the clap count state
      setShowConfetti(true); // Show confetti when claps are registered

      setTimeout(() => {
        setShowConfetti(false);
      }, 3000); // 3 seconds
    } else {
      console.error("Failed to register clap:", response.statusText);
    }
  };

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
      {/* <div className="mx-4">
        <Comments title={title} />
      </div> */}
      <div className="mx-5 my-4 flex items-center justify-center">
        <span
          onClick={handleClap}
          className="cursor-pointer text-red-500 hover:text-red-700 transition duration-200"
        >
          <HeartIcon className="w-7 h-7" />
        </span>
        <p className="ml-2 text-gray-600 text-2xl font-medium">{claps}</p> {/* Display claps */}
      </div>
      {showConfetti && <Confetti />}
    </div>
  );
};

export default PostPageClient;
