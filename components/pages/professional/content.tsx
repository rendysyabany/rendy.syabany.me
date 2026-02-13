/* eslint-disable react/no-unescaped-entities */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ClientContent, { ProfessionalData } from "./client-content";

const getPostContent = (filePath: string) => {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const content = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(content);
    return matterResult;
  } catch (error) {
    console.error(`Error reading post content at ${filePath}:`, error);
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
  const galleryPath = `content/home/home.md`;

  const post = getPostContent(filePath);

  const galleryData = getPostContent(galleryPath);
  const gallery = (galleryData && galleryData.data.gallery) || [];

  if (!post) {
    return <div>Content not found.</div>;
  }

  const data = post.data as unknown as ProfessionalData;

  return <ClientContent data={data} gallery={gallery} />;
}
