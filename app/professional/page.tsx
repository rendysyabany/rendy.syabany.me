import Content from "@/components/pages/professional/content";

import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Rendyansyah Syabany | Professional',
  description: 'Digital Product Designer & Builder',
}

export default async function Professional() {
  return (
    <>

      <Content />
    </>
  );
}
