"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";

import useScroll from "@/lib/hooks/use-scroll";
import { motion } from "framer-motion";
import { BookOpenText, Home, Link as LinkIcon, Mail, NotebookText, Shrub, MoreHorizontal, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const currentPath = usePathname();
  const scrolled = useScroll(50);
  const [showSocial, setShowSocial] = useState(false);
  
  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const titleVariants = {
    initial: { 
      opacity: 0,
      width: 0,
      x: -10 
    },
    animate: { 
      opacity: 1,
      width: "auto",
      x: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      width: 0,
      x: -10,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const navContent = [
    {
      title: "Home",
      link: "/",
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: "Writing",
      link: "/writing",
      icon: <NotebookText className="h-4 w-4" />,
    },
    {
      title: "Bookshelf",
      link: "/bookshelf",
      icon: <BookOpenText className="h-4 w-4" />,
    },
    {
      title: "eCourse",
      link: "/ecourse",
      icon: <Shrub className="h-4 w-4" />,
    },
    // {
    //   title: "Link",
    //   link: "/link",
    //   icon: <LinkIcon className="h-4 w-4" />,
    // },
  ];

  const socialLinks = [
    {
      title: "LinkedIn",
      link: "https://linkedin.com/in/rendysyabany",
      icon: "/icons/linkedin.svg",
    },
    {
      title: "Threads",
      link: "https://www.threads.com/@rendysyabany",
      icon: "/icons/threads.svg",
    },
    {
      title: "Instagram",
      link: "https://instagram.com/rendysyabany",
      icon: "/icons/instagram.svg",
    },
    {
      title: "WhatsApp",
      link: "https://wa.me/6281281199619",
      icon: "/icons/whatsapp.svg",
    },
    {
      title: "Telegram",
      link: "https://t.me/rendysyabany",
      icon: "/icons/telegram.svg",
    },
  ];

  return (
    <>
      {currentPath !== "/link" && (
        <div className={`fixed top-0 z-10 flex w-full justify-center border-b border-gray-200 bg-white`}>
          <div className="flex h-16 w-full max-w-[720px] items-center justify-between px-5">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {navContent.map((nav, i) => (
                  <NavigationMenuItem key={i}>
                    <Link href={nav.link} legacyBehavior passHref>
                      <motion.div
                        whileHover="hover"
                        initial="initial"
                        className="flex items-center gap-2 cursor-pointer relative"
                      >
                        <motion.div 
                          variants={iconVariants} 
                          className={`${
                            currentPath === nav.link
                              ? "text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          {nav.icon}
                        </motion.div>
                        <motion.div
                          initial="initial"
                          whileHover="animate"
                          exit="exit"
                          className="overflow-hidden"
                        >
                          <motion.p
                            variants={titleVariants}
                            className={`font-sans text-sm text-gray-500 whitespace-nowrap ${
                              currentPath === nav.link &&
                              "font-semibold text-gray-700 underline"
                            }`}
                          >
                            {nav.title}
                          </motion.p>
                        </motion.div>
                      </motion.div>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <motion.button
                    onClick={() => setShowSocial(!showSocial)}
                    className="variant-link size-icon"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div 
                      className="flex border-[1.5px] border-gray-400 px-3 rounded-full py-1 min-[400px]:px-3 items-center gap-2 relative"
                      whileHover={{
                        borderColor: "#5e6c7f",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <p className="cursor-pointer font-sans text-sm text-slate-600">
                        Connect
                      </p>
                    </motion.div>
                  </motion.button>
                  
                  {showSocial && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black"
                        onClick={() => setShowSocial(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: "-50%", x: "-50%" }}
                        animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                        exit={{ opacity: 0, scale: 0.95, y: "-50%", x: "-50%" }}
                        className="fixed left-1/2 top-1/2 w-72 bg-white rounded-2xl shadow-xl p-4 z-50"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-sans font-semibold text-gray-900">Connect with me</h3>
                            <button 
                              onClick={() => setShowSocial(false)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              ×
                            </button>
                          </div>
                          <div className="flex flex-col gap-0">
                          {socialLinks.map((social, i) => (
                            <motion.a
                              key={i}
                              href={social.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex font-sans items-center gap-4 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                              whileHover={{ x: 5 }}
                            >
                              <img 
                                src={social.icon} 
                                alt={social.title}
                                className="h-4 w-4"
                              />
                              {social.title}
                            </motion.a>
                          ))}
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      )}
    </>
  );
}