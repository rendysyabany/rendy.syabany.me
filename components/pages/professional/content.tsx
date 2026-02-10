/* eslint-disable react/no-unescaped-entities */
import fs from "fs";
import matter from "gray-matter";
import ClientContent from "./client-content";

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

  return <ClientContent data={data} gallery={gallery} />;
}
