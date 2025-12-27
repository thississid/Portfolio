import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  borderColor?: 'cyan' | 'pink' | 'purple' | 'green' | 'ai';
  hover?: boolean;
  delay?: number;
  initial?: { opacity: number; x?: number; y?: number; scale?: number };
  whileInView?: { opacity: number; x?: number; y?: number; scale?: number };
}

const borderClasses = {
  cyan: 'border-[rgb(var(--neon-cyan))]',
  pink: 'border-[rgb(var(--neon-pink))]',
  purple: 'border-[rgb(var(--neon-purple))]',
  green: 'border-[rgb(var(--neon-green))]',
  ai: 'border-[rgb(var(--accent-ai))]',
};

export default function Card({ 
  children, 
  className = '', 
  borderColor = 'cyan',
  hover = true,
  delay = 0,
  initial = { opacity: 0, y: 20 },
  whileInView = { opacity: 1, y: 0 }
}: CardProps) {
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.3,
        delay,
        ease: 'easeOut'
      }}
      whileHover={hover ? { y: -4 } : {}}
      whileTap={{ scale: 0.98 }}
      className={`${borderClasses[borderColor]} p-6 md:p-8 bg-[rgb(var(--bg-secondary))] bg-opacity-30 backdrop-blur-md border transition-all duration-200 rounded-lg active:scale-[0.98] ${className}`}
    >
      {children}
    </motion.div>
  );
}

