import Content from "@/components/pages/professional/content";
import { NextSeo } from 'next-seo';

export default async function Professional() {
  return (
    <>
      <NextSeo
        title="Rendyansyah Syabany | Professional"
        description="Digital Product Designer & Builder"
      />
      <Content />
    </>
  );
}
