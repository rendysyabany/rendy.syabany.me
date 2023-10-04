import Content from "@/components/pages/home/content";
import { DEPLOY_URL } from "@/lib/constants";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { NextSeo } from "next-seo";

export default async function Home() {
  return (
    <>
      <NextSeo
        title="Rendyansyah Syabany"
        description="Digital Product Designer & Builder"
      />
      <Content />
    </>
  );
}
