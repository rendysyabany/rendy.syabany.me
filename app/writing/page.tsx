import { pb, PostListLates } from "@/lib/pocketbase";
import { format } from "date-fns";
import Link from "next/link";
import { Metadata } from "next";
import { generatePostUrl } from "@/lib/slug-utils";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Rendyansyah Syabany | Writing',
  description: 'Digital Product Designer & Builder',
}

// Fetch posts from PocketBase
async function getPosts() {
  try {
    const result = await pb.collection("posts_published").getList<PostListLates>(1, 50, {
      sort: "-created",
      expand: "author,labels",
      filter: 'status = "published"',
    });
    return result.items;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Writing() {
  const posts = await getPosts();

  return (
    <>
      <div className="mx-5 flex flex-col gap-6">
        {posts.map((post) => {
          const postUrl = generatePostUrl(post.id, post);
          return (
            <Link href={postUrl} key={post.id} className="flex flex-col gap-0">
              <div className="inline-flex flex-col items-start justify-start gap-2">
                
                {/* Image Thumbnail */}
                {post.images && post.images.length > 0 && (
                   <div className="w-full relative mb-2">
                      <Image
                        src={pb.files.getURL(post, post.images[0])}
                        alt={post.title}
                        width={500}
                        height={300}
                        className="rounded-[10px] object-cover w-full h-auto max-h-[300px]"
                        priority={false}
                      />
                   </div>
                )}

                <p className="text-md font-sans font-semibold leading-6 tracking-normal text-gray-700 sm:text-lg">
                  {post.title}
                </p>
                <p className="line-clamp-2 font-sans text-sm font-normal leading-normal tracking-normal text-gray-500">
                  {post.summary}
                </p>
                <p className="mt-2 font-sans text-xs sm:text-sm font-normal leading-normal tracking-normal text-gray-700">
                  Published on{" "}
                  {format(new Date(post.created), "dd MMMM yyyy")},{" "}
                  <span className="font-medium underline">Read more</span>
                </p>
              </div>
              <div className="mx-auto mt-6 w-full border-t border-gray-300"></div>
            </Link>
          );
        })}
        {posts.length === 0 && (
          <p className="text-gray-500 text-center py-10">No posts found.</p>
        )}
      </div>
    </>
  );
}
