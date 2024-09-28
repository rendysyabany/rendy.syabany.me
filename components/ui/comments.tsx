"use client";

import Giscus from "@giscus/react";

export const Comments = ({ title }: { title: any }) => {
  return (
    <Giscus
      id="comments"
      repo="rendysyabany/rendy-blog-discussion"
      repoId="R_kgDOM4glqA"
      category="Announcements"
      categoryId="DIC_kwDOM4glqM4Ci4Jx"
      mapping="pathname"
      term={title}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="lazy"
      strict="1"
    />
  );
};
