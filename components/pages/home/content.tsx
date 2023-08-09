import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";

export default function Content() {
  const avatar =
    "https://pbs.twimg.com/profile_images/1526474082434199552/DyPn7nem_400x400.jpg";
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

  return (
    <div className="mx-5 flex flex-col gap-8">
      <div className="inline-flex h-20 w-96 items-center justify-start gap-4">
        <img className="h-16 w-16 rounded-full" src={avatar} />
        <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-0">
          <div className="self-stretch">
            <span className="text-xl font-black leading-loose text-gray-700">
              Rendyansyay{" "}
            </span>
            <span className="text-xl font-normal leading-loose text-gray-700">
              Sya’bany
            </span>
          </div>
          <div className="self-stretch text-base font-normal leading-snug text-gray-500 mt-[-2px]">
            Product Designer & Indie Maker
          </div>
        </div>
      </div>

      <div className="">
        <p className="text-lg self-stretch font-serif font-normal leading-normal tracking-wide text-gray-600">
          <span>
            A digital nomad fan who loves designing & building digital products.
            I have embraced a dynamic lifestyle that allows me to work remotely.
            Alongside my nomadic adventures, I find immense joy in building
            digital products, continuously seeking opportunities to combine my
            technical expertise and creative flair to{" "}
          </span>
          <span className="font-semibold">
            craft innovative and user-centric solutions.
          </span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="row-span-2">
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="h-full w-full object-cover"
          />
        </div>
        {images.slice(1).map((image) => (
          <div key={image.id} className="col-span-1 row-span-1">
            <img
              src={image.src}
              alt={image.alt}
              className="h-[160px] w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
