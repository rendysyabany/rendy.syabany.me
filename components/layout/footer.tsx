"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.div 
      className="absolute w-full border-t border-gray-200 bg-white py-5 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <p className="font-sans text-gray-500 text-xs sm:text-sm">
        Copyright © {currentYear}{"  "}
        <a
          className="font-medium text-gray-800 transition-colors hover:text-black"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rendyansyah Sya'bany
        </a>
      </p>
    </motion.div>
  );
}
