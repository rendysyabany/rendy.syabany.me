import fs from "fs";
import matter from "gray-matter";

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

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const fullName = "Rendyansyah Sya'bany"

  const slug = "home"; // Slug for the homepage
  const filePath = `content/home/${slug}.md`;

  const post = getPostContent(filePath);

  if (!post) {
    return <div>Content not found.</div>;
  }

  const {
    data: { firstName, lastName }
  } = post;

  return (
    
    <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center">
      <p className="font-sans text-gray-500 text-sm">
        Copyright © {currentYear}{" "}
        <a
          className="font-medium text-gray-800 transition-colors"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          {firstName}{" "}{lastName}
        </a>
      </p>
    </div>
  );
}
