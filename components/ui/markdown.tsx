import Markdown from "markdown-to-jsx";
import React from "react";

interface MainMarkdownProps {
  content: string;
  classStyle?: string; // Define the additional optional attribute here
}

const MainMarkdown = ({ content, classStyle }: MainMarkdownProps) => {
  const h1Style = "text-2xl sm:text-4xl font-bold mb-4 text-gray-700";
  const h2Style = "text-xl sm:text-3xl font-semibold mb-3 text-gray-700";
  const h3Style = "font-sans text-lg sm:text-2xl font-semibold mb-3 text-gray-700";
  const pStyle =
    "text-md sm:text-lg mt-[-2px] font-serif font-normal leading-relaxed tracking-normal text-gray-700";
  const quoteStyle =
    "text-xl sm:text-2xl mt-[-2px] font-serif font-normal leading-normal tracking-normal text-gray-700 pl-4 border-l-2 border-gray-400 italic";
  return (
    <Markdown
      className={classStyle ? classStyle : "text-md flex flex-col gap-3 self-stretch font-serif font-normal leading-normal tracking-normal text-gray-600 sm:text-lg"}
      options={{
        overrides: {
          h1: { component: "h1", props: { className: h1Style } },
          h2: { component: "h2", props: { className: h2Style } },
          h3: { component: "h3", props: { className: h3Style } },
          p: { component: "p", props: { className: pStyle } },
          blockquote: {
            component: "blockquote",
            props: { className: quoteStyle },
          },
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export default MainMarkdown;
