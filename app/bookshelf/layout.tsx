import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bookshelf - Rendyansyah Syabany',
  description: 'My Personal Reading Collection',
};

export default function BookshelfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}