import Footer from "@/components/layout/footer";
import NavBar from "@/components/layout/navbar";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { Suspense } from "react";
import { inter, roboto_mono, roboto_serif, source_serif_4 } from "./fonts";
import "./globals.css";
import Script from "next/script";
// import 'remixicon/fonts/remixicon.css'
// import { Roboto, Roboto_Serif } from 'next/font/google'

export const metadata = {
  title: "Rendyansyah Sya'bany",
  description: "Personal Website & Profile",
  twitter: {
    card: "summary_large_image",
    title: "Personal Website & Profile",
    description: "Personal Website & Profile",
    creator: "@rendysyabany",
  },
  metadataBase: new URL("https://syabany.me"),
  // themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <script
          async
          src="https://tracking.syabany.com/script.js"
          data-website-id="6148d5fd-cf2e-48bd-9f92-15637afdd1d2"
        ></script> */}

        <link rel="icon" href="/favicon.jpg" sizes="any" />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,200;0,8..60,300;0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;0,8..60,800;0,8..60,900;1,8..60,200;1,8..60,300;1,8..60,400;1,8..60,500;1,8..60,600;1,8..60,700;1,8..60,800;1,8..60,900&display=swap"
        />

        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=G-WL8LK9LTVT`}
        />

        <Script id="google-analytics-script" strategy="lazyOnload">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WL8LK9LTVT', {
          page_path: window.location.pathname,
          });
    `}
        </Script>

        <script
          src="https://giscus.app/client.js"
          data-repo="rendysyabany/rendy-blog-discussion"
          data-repo-id="R_kgDOM4glqA"
          data-category="Announcements"
          data-category-id="DIC_kwDOM4glqM4Ci4Jx"
          data-mapping="pathname"
          data-strict="1"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="bottom"
          data-theme="preferred_color_scheme"
          data-lang="en"
          crossOrigin="anonymous"
          async
        ></script>

        	
      </head>
      <body
        className={cx(
          source_serif_4.variable,
          inter.variable,
          roboto_mono.variable,
        )}
      >
        {/* <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" /> */}
        <Suspense fallback="...">
          <NavBar />
        </Suspense>
        <main style={{ minHeight: "calc(100vh - 62px)"}} className="flex w-full flex-col items-center pb-6 pt-24">
          <div className="flex w-full max-w-[720px]">{children}</div>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
