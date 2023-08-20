import MainMarkdown from "@/components/ui/markdown";
import { format } from "date-fns";
import fs from "fs";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import Link from "next/link";
import path from "path";

interface ImageData {
  galleryItem: string;
  caption: string;
}

interface PostData {
  data: {
    title: string;
    shortDescription: string;
    slug: string;
    datePublished: any;
    // Add more properties as needed
  };
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

const getAllPostContents = (): PostData[] => {
  const folder = "content/posts/";
  const fileNames = fs.readdirSync(folder);
  const postContents: PostData[] = [];

  fileNames.forEach((fileName) => {
    if (fileName.endsWith(".md")) {
      const filePath = path.join(folder, fileName);
      const content = fs.readFileSync(filePath, "utf8");
      const matterResult = matter(content) as unknown as PostData;
      postContents.push(matterResult);
    }
  });

  return postContents;
};

export const generateStaticParams = async () => {
  return [
    // Return the slug for the homepage
    { slug: "home" },
  ];
};

export default function Content() {
  const allPost = getAllPostContents();
  const postUrls = fs
    .readdirSync("content/posts/")
    .map((filename) => `/writing/${filename.replace(/\.md$/, "")}`);

  const slug = "home"; // Slug for the homepage
  const filePath = `content/home/${slug}.md`;

  const post = getPostContent(filePath);

  if (!post) {
    return <div>Content not found.</div>;
  }

  const {
    data: { avatar, firstName, lastName, description, about, gallery },
  } = post;

  const h1Style = "text-2xl sm:text-4xl font-bold mb-4 text-gray-700";
  const h2Style = "text-xl sm:text-3xl font-semibold mb-3 text-gray-700";
  const h3Style = "font-sans text-lg sm:text-2xl font-semibold mb-3 text-gray-700";
  const pStyle =
    "text-md sm:text-lg mt-[-2px] font-serif font-normal leading-relaxed tracking-normal text-gray-700";
  const quoteStyle =
    "text-xl sm:text-2xl mt-[-2px] font-serif font-normal leading-normal tracking-normal text-gray-700 pl-4 border-l-2 border-gray-400 italic";

  return (
    <div className="mx-5 flex flex-col gap-8">
      <div className="inline-flex h-auto w-full items-center justify-start gap-4">
        <img className="h-14 w-14 sm:h-16 sm:w-16 rounded-full" src={avatar} />
        <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0">
          <div className="self-stretch">
            <span className="text-md font-sans font-semibold leading-loose text-gray-700 sm:text-xl">
              {firstName}{" "}
            </span>
            <span className="text-md font-sans font-light leading-loose text-gray-700 sm:text-xl">
              {lastName}
            </span>
          </div>
          <div className="mt-[-2px] self-stretch text-sm font-normal leading-normal text-gray-500 sm:text-base">
            {description}
          </div>
        </div>
      </div>

      <MainMarkdown classStyle="flex flex-col gap-7" content={about} />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <div className="row-span-2">
          <Image
            src={gallery[0].galleryItem}
            alt={gallery[0].caption}
            width={400}
            height={400}
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
        {gallery.slice(1).map((image: ImageData, i: number) => (
          <div key={i} className="col-span-1 row-span-1">
            <Image
              src={image.galleryItem}
              alt={image.caption}
              width={400}
              height={400}
              className="h-[120px] w-full rounded-xl object-cover sm:h-[160px]"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <p className="my-[-6px] self-stretch font-sans text-xl font-semibold leading-loose text-gray-700 sm:text-2xl">
          Recent post.
        </p>
        {allPost.slice(0, 4).map((data, i) => (
          <Link href={postUrls[i]} key={i} className="flex flex-col gap-0">
            <div className="inline-flex flex-col items-start justify-start gap-2">
              <p className="text-md font-sans font-semibold leading-6 tracking-normal text-gray-700 sm:text-lg">
                {data.data.title}
              </p>
              <p className="line-clamp-2 font-serif text-sm font-normal leading-normal tracking-normal text-gray-500">
                {data.data.shortDescription}
              </p>
              <p className="mt-2 font-serif text-sm font-normal leading-normal tracking-normal text-gray-700">
                Published on{" "}
                {format(new Date(data.data.datePublished), "dd MMMM yyyy")},{" "}
                <span className="font-medium underline">Read more</span>
              </p>
            </div>
            {i !== allPost.length - 1 && (
              <div className="mx-auto mt-6 w-full border-t border-gray-300"></div>
            )}
          </Link>
        ))}

        <Link
          href={"/writing"}
          className="text-md font-serif font-normal leading-normal tracking-normal text-gray-700"
        >
          <span className="font-medium underline">See all post</span>
        </Link>
      </div>
    </div>
  );
}
