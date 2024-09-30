// app/writing/[slug]/PostPageClient.tsx
"use client"; // This marks the component as a Client Component

import { useState } from "react";
import { Comments } from "@/components/ui/comments";
import MainMarkdown from "@/components/ui/markdown";
import { format } from "date-fns/format";

const PostPageClient = ({ post }: any) => {
  const {
    data: { title, shortDescription, datePublished },
    content,
  } = post;

  const [claps, setClaps] = useState(post.claps || 0); // Initial clap count

  const handleClap = async () => {
    const response = await fetch("/api/clap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: post.slug }), // Ensure post.slug is defined
    });
  
    if (response.ok) {
      const updatedPost = await response.json();
      setClaps(updatedPost.claps); // Update the clap count state
    } else {
      console.error("Failed to register clap:", response.statusText); // Log the status text for debugging
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
      <div className="mx-4">
        <Comments title={title} />
      </div>
      <div className="mx-5 my-4">
        <button
          onClick={handleClap}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Clap
        </button>
        <p className="mt-2 text-gray-600">Claps: {claps}</p>
      </div>
    </div>
  );
};

export default PostPageClient;
