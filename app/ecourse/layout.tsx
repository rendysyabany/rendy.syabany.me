import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'eCourse - Rendyansyah Syabany',
  description: 'Learn with me',
};

export default function BookshelfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}