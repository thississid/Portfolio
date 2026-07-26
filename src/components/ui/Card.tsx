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
  initial = { opacity: 0, y: 12 },
  whileInView = { opacity: 1, y: 0 }
}: CardProps) {
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.85,
        delay: Math.min(delay, 0.16),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`${borderClasses[borderColor]} p-6 md:p-8 bg-[rgb(var(--surface))]/88 border transition-[border-color,box-shadow,background-color] duration-500 ease-out rounded-lg shadow-[0_24px_80px_rgba(22,38,66,0.14)] backdrop-blur-xl ${hover ? 'hover:border-[rgb(var(--neon-cyan))] hover:shadow-[0_28px_90px_rgba(34,211,238,0.18)]' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
