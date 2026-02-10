import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  return [
    {
      url: "https://rendy.syabany.com",
      lastModified: new Date(),
    },
  ];
}
