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

  // console.log(post.data)

  // const avatar =
  //   "https://pbs.twimg.com/profile_images/1526474082434199552/DyPn7nem_400x400.jpg";

  return (
    <div className="mx-5 flex flex-col gap-8">
      <Markdown className="text-md flex flex-col gap-3 self-stretch font-serif font-normal leading-normal tracking-normal text-gray-600 sm:text-lg">
        {about}
      </Markdown>

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

      <div className="flex flex-col gap-6">
        <p className="self-stretch font-sans text-xl font-semibold leading-loose text-gray-700">
          Recent Post.
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
      </div>
    </div>
  );
}
