"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

export default function FloatingConnectButton() {
  const [showSocial, setShowSocial] = useState(false);

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
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <motion.button
          onClick={() => setShowSocial(!showSocial)}
          className="bg-white text-slate-800 shadow-lg border border-gray-200 px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-gray-50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className="font-sans font-medium text-sm">Connect</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showSocial && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50"
              onClick={() => setShowSocial(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: "-50%", x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, y: "-50%", x: "-50%" }}
              className="fixed left-1/2 top-1/2 w-72 bg-white rounded-2xl shadow-xl p-4 z-[60]"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-sans font-semibold text-gray-900">
                    Connect with me
                  </h3>
                  <button
                    onClick={() => setShowSocial(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
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
      </AnimatePresence>
    </>
  );
}
