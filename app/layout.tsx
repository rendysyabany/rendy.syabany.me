import Footer from "@/components/layout/footer";
import NavBar from "@/components/layout/navbar";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { Suspense } from "react";
import { inter, roboto_mono, roboto_serif, source_serif_4 } from "./fonts";
import "./globals.css";
// import { Roboto, Roboto_Serif } from 'next/font/google'

export const metadata = {
  title: "Rendyansyah Sya'bany",
  description:
    "Personal Website & Profile",
  twitter: {
    card: "summary_large_image",
    title: "Personal Website & Profile",
    description:
      "Personal Website & Profile",
    creator: "@rendysyabany",
  },
  metadataBase: new URL("https://syabany.me"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body className={cx(source_serif_4.variable, inter.variable, roboto_mono.variable)}>
        {/* <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" /> */}
        <Suspense fallback="...">
          <NavBar />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center py-24">
          <div className="flex w-full max-w-[720px]">{children}</div>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
