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
import { Button } from "../ui/button";
import { Sun, SunIcon } from "lucide-react";

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
        <div className="px-5 flex h-16 w-full max-w-[720px] items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navContent.map((nav, i) => (
                <NavigationMenuItem key={i}>
                  <Link href={nav.link} legacyBehavior passHref>
                    <p
                      className={`cursor-pointer font-sans text-sm text-gray-500 hover:underline ${
                        currentPath === nav.link && "font-bold text-gray-700"
                      }`}
                    >
                      {nav.title}
                    </p>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <Link href="https://syabany.me" legacyBehavior passHref>
                  <p
                    className={`cursor-pointer font-sans text-sm text-gray-500 hover:underline`}
                  >
                    Connect with me
                  </p>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button onClick={()=> console.log("click-lamp")} variant="link" size="icon">
                  <Sun className="h-4 w-4" />
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </>
  );
}
