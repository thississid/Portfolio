import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  color?: 'cyan' | 'pink' | 'purple' | 'green' | 'ai';
  className?: string;
}

const colorClasses = {
  cyan: 'neon-text-cyan',
  pink: 'neon-text-pink',
  purple: 'neon-text-purple',
  green: 'neon-text-green',
  ai: 'neon-text-ai',
};

const colorBorders = {
  cyan: 'bg-[rgb(var(--neon-cyan))] shadow-[0_0_10px_rgb(var(--neon-cyan))]',
  pink: 'bg-[rgb(var(--neon-pink))] shadow-[0_0_10px_rgb(var(--neon-pink))]',
  purple: 'bg-[rgb(var(--neon-purple))] shadow-[0_0_10px_rgb(var(--neon-purple))]',
  green: 'bg-[rgb(var(--neon-green))] shadow-[0_0_10px_rgb(var(--neon-green))]',
  ai: 'bg-[rgb(var(--accent-ai))] shadow-[0_0_10px_rgb(var(--accent-ai))]',
};

export default function SectionTitle({ 
  title, 
  color = 'cyan',
  className = '' 
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-mono ${colorClasses[color]}`}>
        {title}
      </h2>
      <div className={`h-1 w-32 md:w-48 ${colorBorders[color]} mb-12 md:mb-16`} />
    </motion.div>
  );
}

