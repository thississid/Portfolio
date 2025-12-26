'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
      }}
      className="relative w-14 h-7 rounded-full bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--neon-cyan))] p-1 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--neon-cyan))] focus:ring-offset-2 focus:ring-offset-[rgb(var(--bg-primary))] cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
      type="button"
    >
      <motion.div
        className="w-5 h-5 rounded-full bg-[rgb(var(--neon-cyan))] shadow-[0_0_10px_rgb(var(--neon-cyan))] relative z-10"
        animate={{
          x: theme === 'dark' ? 0 : 28,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
      <span className="absolute inset-0 flex items-center justify-between px-2 text-xs font-mono pointer-events-none">
        <span className={theme === 'dark' ? 'opacity-100' : 'opacity-30'}>🌙</span>
        <span className={theme === 'light' ? 'opacity-100' : 'opacity-30'}>☀️</span>
      </span>
    </motion.button>
  );
}

