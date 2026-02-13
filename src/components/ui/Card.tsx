import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  borderColor?: 'moss' | 'sakura' | 'indigo' | 'terracotta' | 'beige';
  hover?: boolean;
  delay?: number;
  initial?: { opacity: number; x?: number; y?: number; scale?: number };
  whileInView?: { opacity: number; x?: number; y?: number; scale?: number };
}

const borderClasses = {
  moss: 'border-[rgb(var(--moss-green))]',
  sakura: 'border-[rgb(var(--sakura-pink))]',
  indigo: 'border-[rgb(var(--indigo-blue))]',
  terracotta: 'border-[rgb(var(--terracotta))]',
  beige: 'border-[rgb(var(--warm-beige))]',
};

export default function Card({ 
  children, 
  className = '', 
  borderColor = 'moss',
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
        duration: 0.5,
        delay,
        ease: 'easeOut'
      }}
      whileHover={hover ? { y: -3, scale: 1.01 } : {}}
      whileTap={{ scale: 0.99 }}
      className={`${borderClasses[borderColor]} p-6 md:p-8 bg-[rgb(var(--bg-tertiary))] bg-opacity-60 backdrop-blur-md border-2 transition-all duration-300 rounded-sm shadow-sm hover:shadow-md ${className}`}
    >
      {children}
    </motion.div>
  );
}

