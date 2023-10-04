import Content from "@/components/pages/home/content";

import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Rendyansyah Syabany',
  description: 'Digital Product Designer & Builder',
}

export default async function Home() {
  return (
    <>
      <Content />
    </>
  );
}
