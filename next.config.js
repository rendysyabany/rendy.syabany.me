/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: false,
  images: {
    domains: ["lh3.googleusercontent.com", "vercel.com", "picsum.photos", "pbs.twimg.com"],
  },
  eslint: {ignoreDuringBuilds: true},
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
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
