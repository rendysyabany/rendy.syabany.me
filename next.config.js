/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: false,
  images: {
    domains: ["lh3.googleusercontent.com", "vercel.com", "picsum.photos", "pbs.twimg.com"],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/github",
  //       destination: "https://github.com/steven-tey/precedent",
  //       permanent: false,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
