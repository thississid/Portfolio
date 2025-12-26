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
  cyan: 'neon-border',
  pink: 'neon-border-pink',
  purple: 'neon-border-purple',
  green: 'neon-border-green',
  ai: 'neon-border',
};

const hoverShadows = {
  cyan: 'hover:shadow-[0_0_30px_rgb(var(--neon-cyan))]',
  pink: 'hover:shadow-[0_0_30px_rgb(var(--neon-pink))]',
  purple: 'hover:shadow-[0_0_30px_rgb(var(--neon-purple))]',
  green: 'hover:shadow-[0_0_30px_rgb(var(--neon-green))]',
  ai: 'hover:shadow-[0_0_30px_rgb(var(--accent-ai))]',
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
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      className={`${borderClasses[borderColor]} p-6 md:p-8 bg-[rgb(var(--bg-secondary))] bg-opacity-50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${hover ? hoverShadows[borderColor] : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

