/* eslint-disable react/no-unescaped-entities */
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";

export default function Content() {
  const avatar =
    "https://pbs.twimg.com/profile_images/1526474082434199552/DyPn7nem_400x400.jpg";

  const product = [
    {
      image:
        "https://pbs.twimg.com/profile_images/1526474082434199552/DyPn7nem_400x400.jpg",
      title: "Bahagia.day",
      url: "Bahagia.day",
      bgColor: "#FFE4E6",
    },
    {
      image:
        "https://pbs.twimg.com/profile_images/1526474082434199552/DyPn7nem_400x400.jpg",
      title: "Kreator Peradaban",
      url: "Kreatorperadaban.com",
      bgColor: "#FFE4E6",
    },
  ];

  const social = [
    { icon: "/social/ic-linkedIn.svg" },
    { icon: "/social/ic-telegram.svg" },
    { icon: "/social/ic-twitter.svg" },
    { icon: "/social/ic-whatsApp.svg" },
  ];

  const images = [
    {
      id: 1,
      src: "https://picsum.photos/id/1018/600/800",
      alt: "First Image",
      // colSpan: 2,
      rowSpan: 2,
    },
    {
      id: 2,
      src: "https://picsum.photos/id/1015/600/800",
      alt: "Second Image",
    },
    {
      id: 3,
      src: "https://picsum.photos/id/1020/600/800",
      alt: "Third Image",
    },
    {
      id: 4,
      src: "https://picsum.photos/id/1019/600/800",
      alt: "Fourth Image",
    },
    {
      id: 5,
      src: "https://picsum.photos/id/1016/600/800",
      alt: "Fifth Image",
    },
    {
      id: 6,
      src: "https://picsum.photos/id/1021/600/800",
      alt: "Sixth Image",
    },
    {
      id: 7,
      src: "https://picsum.photos/id/1022/600/800",
      alt: "Seventh Image",
    },
    {
      id: 8,
      src: "https://picsum.photos/id/1023/600/800",
      alt: "Eighth Image",
    },
  ];

  const tagSkill = [
    {
      title: "Figma Expert",
      bgColor: "#f6f2e9",
    },
    {
      title: "Design System Architect",
      bgColor: "#F5FBF1",
    },
    {
      title: "Usability Analyst",
      bgColor: "#FFE8E8",
    },
    {
      title: "No-Code Enthusiast",
      bgColor: "#F5FBF1",
    },
  ];

  const project = [
    {
      title: "Madu Sumbawa Premium",
      description:
        "I love building my own products and I hope will solve many problems.",
      category: [
        {
          title: "Mobile App",
        },
        {
          title: "Design System",
        },
      ],
      bgColor: "#F9F7E1",
    },
    {
      title: "Madu Sumbawa Premium 2",
      description:
        "I love building my own products and I hope will solve many problems.",
      category: [
        {
          title: "Mobile App",
        },
        {
          title: "Design System",
        },
        {
          title: "Web App",
        },
      ],
      bgColor: "#FFE4E6",
    },
  ];

  const gear = [
    {
      name: "Figma",
      description: "UI Design, prototyping",
      logo: "https://pbs.twimg.com/profile_images/1526474082434199552/DyPn7nem_400x400.jpg",
    },
    {
      name: "Nextjs",
      description: "UI Design, prototyping",
      logo: "https://pbs.twimg.com/profile_images/1526474082434199552/DyPn7nem_400x400.jpg",
    },
    {
      name: "SkuyJs",
      description: "UI Design, prototyping",
      logo: "https://pbs.twimg.com/profile_images/1526474082434199552/DyPn7nem_400x400.jpg",
    },
  ];

  return (
    <div className="mx-5 flex flex-col gap-8">
      <div className="inline-flex h-20 w-96 items-center justify-start gap-4">
        <img className="h-16 w-16 rounded-full" src={avatar} />
        <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0">
          <div className="self-stretch">
            <span className="text-xl font-black leading-loose text-gray-700">
              Rendyansyay
            </span>
          </div>
          <div className="mt-[-2px] self-stretch text-base font-normal leading-snug text-gray-500">
            Product Designer & Indie Maker
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {tagSkill.map((tag, i) => (
          <Badge
            key={i}
            variant="secondary"
            style={{ backgroundColor: tag.bgColor }}
            className="font-medium text-gray-600"
          >
            {tag.title}
          </Badge>
        ))}
      </div>

      <div className="">
        <p className="self-stretch font-serif text-lg font-normal leading-normal tracking-wide text-gray-600">
          <span>
            I thrive on transforming ideas into tangible solutions, blending
            aesthetics with functionality to create products that delight users.
            <br />
            <br />
            The empathy-driven approach allows me to create products that truly
            resonate with the end-users, making a positive impact on their
            lives. I am dedicated to human-centered design principles, where the
            user's experience takes center stage in every decision I make.
          </span>
        </p>
      </div>

      <div className="inline-flex h-11 w-80 items-center justify-start gap-4 rounded-md bg-neutral-100 p-2.5">
        {social.map((soc, i) => (
          <Image
            key={i}
            src={soc.icon}
            alt={soc.icon}
            className="h-6 w-6 object-cover"
            width={600}
            height={600}
          />
        ))}
        <div className="text-sm font-semibold leading-tight text-gray-700 underline">
          Download Resume
        </div>
      </div>

      <div className="my-4 border-t border-gray-300"></div>

      <div className="flex flex-col gap-8">
        <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0">
          <p className="self-stretch text-xl font-semibold leading-loose text-gray-700">
            My own beloved products.
          </p>
          <p className="text-md mt-[-2px] self-stretch font-serif font-normal leading-snug text-gray-500">
            I love building my own products and I hope will solve many problems.
          </p>
        </div>

        <div className="grid h-auto w-full grid-cols-2 items-start justify-start gap-2.5">
          {product.map((product, i) => (
            <div
              key={i}
              className="flex h-auto w-full min-w-[260px] items-center justify-start gap-4 rounded-xl bg-rose-100 p-4"
            >
              <Image
                className="h-14 w-14 rounded-lg"
                src={product.image}
                alt={product.image}
                width={600}
                height={600}
              />
              <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0.5">
                <div className="text-md self-stretch font-bold leading-relaxed text-gray-700">
                  {product.title}
                </div>
                <a
                  href={"https://" + product.url}
                  className="text-xs font-medium leading-none text-gray-500 underline"
                >
                  {product.url}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-4 border-t border-gray-300"></div>

      <div className="flex flex-col gap-8">
        <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0">
          <p className="self-stretch text-xl font-semibold leading-loose text-gray-700">
            Selected Works.
          </p>
          <p className="text-md mt-[-2px] self-stretch font-serif font-normal leading-snug text-gray-500">
            I love building my own products and I hope will solve many problems.
          </p>
        </div>

        <div className="flex h-auto w-full flex-col items-start justify-start gap-2.5">
          {project.map((project, i) => (
            <div
              key={i}
              className="inline-flex h-auto w-full flex-col items-start justify-start gap-4 rounded-xl bg-emerald-50 p-5"
              style={{ backgroundColor: project.bgColor }}
            >
              <div className="flex h-auto flex-col items-start justify-start gap-0 self-stretch">
                <div className="text-md self-stretch font-sans font-bold leading-normal text-gray-700">
                  {project.title}
                </div>
                <div className="self-stretch font-serif text-sm font-normal leading-normal text-gray-500">
                  {project.description}
                </div>
              </div>
              <div className="inline-flex items-start justify-start gap-2.5 self-stretch">
                {project.category.map((category, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-white font-medium text-gray-600"
                  >
                    {category.title}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {images.slice(1).map((image) => (
            <div key={image.id} className="col-span-1 row-span-1">
              <AspectRatio className="z-0" ratio={1 / 1}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  className=" object-cover"
                  fill
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>

      <div className="my-4 border-t border-gray-300"></div>

      <div className="flex flex-col gap-8">
        <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0">
          <p className="self-stretch text-xl font-semibold leading-loose text-gray-700">
            Stack Gear.
          </p>
          <p className="text-md mt-[-2px] self-stretch font-serif font-normal leading-snug text-gray-500">
            I love building my own products and I hope will solve many problems.
          </p>
        </div>

        <div className="grid h-auto w-full grid-cols-4 items-start justify-start gap-2.5">
          {gear.map((gear, i) => (
            <div
              key={i}
              className="inline-flex h-auto w-full min-w-[140px] flex-col items-center justify-center gap-1.5 rounded-lg bg-neutral-100 px-3.5 py-4"
            >
              <Image
                className="h-12 w-12 rounded-lg"
                src={gear.logo}
                alt={gear.logo}
                width={600}
                height={600}
              />
              <div className="flex flex-col items-center justify-center">
                <div className="text-base font-semibold text-gray-700">
                  {gear.name}
                </div>
                <div className="text-center text-xs font-normal text-gray-500">
                  {gear.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
