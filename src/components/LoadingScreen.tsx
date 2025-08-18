import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const emojis = ['🚀', '💻', '⚡', '✨', '🎯'];
  const [currentEmoji, setCurrentEmoji] = useState(0);

  useEffect(() => {
    const emojiInterval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % emojis.length);
    }, 500);

    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 35);

    return () => {
      clearInterval(emojiInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-gray-900 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ zIndex: 9999 }}
    >
      <div className="max-w-sm w-full mx-auto px-4">
        <motion.div
          className="text-6xl mb-8 text-center"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 0.5 }}
        >
          {emojis[currentEmoji]}
        </motion.div>

        <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <motion.p
          className="text-cyan-400 text-center mt-4 font-medium"
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          Loading your portfolio...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
