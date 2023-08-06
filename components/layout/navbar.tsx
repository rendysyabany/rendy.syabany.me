"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const currentPath = usePathname();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const navContent = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Professional",
      link: "/professional",
    },
    {
      title: "Writing",
      link: "/writing",
    },
  ];

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 flex w-full justify-center border-b border-gray-200 bg-white`}
      >
        <div className="mx-5 flex h-16 w-full max-w-[720px] items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList className="gap-4">
              {navContent.map((nav, i) => (
                <NavigationMenuItem key={i}>
                  <Link href={nav.link} legacyBehavior passHref>
                    <p className={`font-sans cursor-pointer hover:underline text-[#6F7E82] tex-sm ${currentPath === nav.link && "underline font-semibold text-[#3C4A4D]"}`}>{nav.title}</p>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div>
            <button
              className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
              onClick={() => console.log("click")}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
