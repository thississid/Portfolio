import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  color?: 'cyan' | 'pink' | 'purple' | 'green' | 'ai';
  className?: string;
}

const colorClasses = {
  cyan: 'text-[rgb(var(--neon-cyan))]',
  pink: 'text-[rgb(var(--neon-pink))]',
  purple: 'text-[rgb(var(--neon-purple))]',
  green: 'text-[rgb(var(--neon-green))]',
  ai: 'text-[rgb(var(--accent-ai))]',
};

const colorBorders = {
  cyan: 'bg-[rgb(var(--neon-cyan))]',
  pink: 'bg-[rgb(var(--neon-pink))]',
  purple: 'bg-[rgb(var(--neon-purple))]',
  green: 'bg-[rgb(var(--neon-green))]',
  ai: 'bg-[rgb(var(--accent-ai))]',
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
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${colorClasses[color]}`}>
        {title}
      </h2>
      <div className={`h-1 w-24 ${colorBorders[color]} mb-12 md:mb-16 rounded-full`} />
    </motion.div>
  );
}

