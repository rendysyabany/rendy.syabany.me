'use client';

import { BookOpenText } from "lucide-react";
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
            <BookOpenText className="h-16 w-16 text-gray-400 mx-auto" />
          </motion.div>
          <h2 className="text-2xl font-sans font-semibold text-gray-700">
            Coming Soon
          </h2>
          <p className="text-gray-500 max-w-sm">
            Currently curating a thoughtful collection of books. 
            Stay tuned for insights and recommendations.
          </p>
        </div>
      </motion.div>
    </div>
  );
}