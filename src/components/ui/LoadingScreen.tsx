'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] bg-[rgb(var(--bg-primary))] flex items-center justify-center"
        >
          <div className="text-center">
            {/* Animated Logo/Text */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold neon-text-cyan font-mono mb-4">
                {'<SIDDARTHA />'}
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-1 bg-[rgb(var(--neon-cyan))] mx-auto max-w-xs"
              />
            </motion.div>

            {/* Progress Bar */}
            <div className="w-64 md:w-96 h-2 bg-[rgb(var(--bg-secondary))] rounded-full overflow-hidden border border-[rgb(var(--neon-cyan))]">
              <motion.div
                className="h-full bg-gradient-to-r from-[rgb(var(--neon-cyan))] to-[rgb(var(--neon-pink))]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Progress Text */}
            <motion.p
              className="text-[rgb(var(--neon-green))] font-mono mt-4 text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {`> LOADING: ${Math.round(progress)}%`}
            </motion.p>

            {/* Loading Dots */}
            <motion.div
              className="flex gap-2 justify-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-[rgb(var(--neon-cyan))] rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

