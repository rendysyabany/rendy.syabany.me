'use client';

import { BookOpenText, Shrub } from "lucide-react";
import { motion } from "framer-motion";

export default function Bookshelf() {
  return (
    <div className="mx-5 flex flex-col gap-8">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-[400px] items-center justify-center"
      >
        <div className="text-center space-y-4">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1.1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <Shrub className="h-16 w-16 text-gray-400 mx-auto" />
          </motion.div>
          <h2 className="text-2xl font-sans font-semibold text-gray-700">
            Coming Soon
          </h2>
          <p className="text-gray-500 max-w-sm">
            Currently developing engaging online courses and learning materials.
            Check back soon for educational content and interactive lessons.
          </p>
        </div>
      </motion.div>
    </div>
  );
}