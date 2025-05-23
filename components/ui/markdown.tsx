import Markdown from "markdown-to-jsx";
import React from "react";

interface MainMarkdownProps {
  content: string;
  classStyle?: string; // Define the additional optional attribute here
}

const MainMarkdown = ({ content, classStyle }: MainMarkdownProps) => {
  const h1Style = "text-3xl sm:text-4xl font-bold mb-4 mt-8 text-gray-700";
  const h2Style = "text-2xl sm:text-3xl font-bold mb-3 mt-8 text-gray-700";
  const h3Style = "font-sans text-xl sm:text-2xl font-bold mt-8 mb-0 text-gray-700";
  const pStyle =
    "text-[15px] sm:text-[18px] mt-[-2px] font-sans font-normal leading-[1.6] tracking-normal text-gray-600";
  const quoteStyle =
    "text-4xl sm:text-6xl mt-[-2px] font-sans font-normal leading-normal tracking-normal text-gray-700 pl-4 border-l-2 border-gray-400 italic";
  const imageStyle =
    "py-4";
  const linkStyle = "text-blue-600 hover:text-blue-800 underline decoration-blue-400 decoration-2 underline-offset-2 transition-colors duration-200";
  return (
    <Markdown
      className={classStyle ? classStyle : "text-md flex flex-col gap-3 self-stretch font-sans font-normal leading-normal tracking-normal text-gray-600 sm:text-lg"}
      options={{
        overrides: {
          h1: { component: "h1", props: { className: h1Style } },
          h2: { component: "h2", props: { className: h2Style } },
          h3: { component: "h3", props: { className: h3Style } },
          p: { component: "p", props: { className: pStyle } },
          img: { component: "img", props: { className: imageStyle } },
          blockquote: {
            component: "blockquote",
            props: { className: quoteStyle, },
          },
          a: {
            component: "a",
            props: { className: linkStyle, target: "_blank", rel: "noopener noreferrer" },
          },
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export default MainMarkdown;
