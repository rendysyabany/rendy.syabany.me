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
// import { useSignInModal } from "./sign-in-modal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Mail, Sun, SunIcon } from "lucide-react";

export default function NavBar() {
  const currentPath = usePathname();
  // const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const navContent = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Writing",
      link: "/writing",
    },
    {
      title: "Link",
      link: "/link",
    },
  ];

  return (
    <>
      {/* <SignInModal /> */}
      {currentPath !== "/link" && (
        <div
          className={`fixed top-0 z-10 flex w-full justify-center border-b border-gray-200 bg-white`}
        >
          <div className="flex h-16 w-full max-w-[720px] items-center justify-between px-5">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {navContent.map((nav, i) => (
                  <NavigationMenuItem key={i}>
                    <Link href={nav.link} legacyBehavior passHref>
                      <p
                        className={`cursor-pointer font-sans text-sm text-gray-500 hover:underline ${
                          currentPath === nav.link &&
                          "font-semibold text-gray-700 underline"
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
                  <a
                    href="mailto:rendysyabany@gmail.com"
                    className="variant-link size-icon"
                  >
                    <div className="flex bg-slate-600 px-2 rounded-full py-2 min-[400px]:px-3 items-center gap-2">
                      <p
                        className={`hidden min-[400px]:block cursor-pointer font-sans text-sm text-white hover:underline`}
                      >
                        Contact
                      </p>
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                  </a>
                  {/* <Button
                    onClick={() => console.log("click-lamp")}
                    variant="link"
                    size="icon"
                  >
                    <Sun className="h-4 w-4" />
                  </Button> */}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      )}
    </>
  );
}
