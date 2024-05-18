import Content from "@/components/pages/professional/content";

import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Rendyansyah Syabany | Professional',
  description: 'Crafting Empathy-driven products',
}

export default async function Professional() {
  return (
    <>

      <Content />
    </>
  );
}
