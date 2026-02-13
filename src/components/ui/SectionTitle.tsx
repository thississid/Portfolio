import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  color?: 'moss' | 'sakura' | 'indigo' | 'terracotta' | 'beige';
  className?: string;
}

const colorClasses = {
  moss: 'text-[rgb(var(--moss-green))]',
  sakura: 'text-[rgb(var(--sakura-pink))]',
  indigo: 'text-[rgb(var(--indigo-blue))]',
  terracotta: 'text-[rgb(var(--terracotta))]',
  beige: 'text-[rgb(var(--warm-beige))]',
};

const colorBorders = {
  moss: 'bg-[rgb(var(--moss-green))]',
  sakura: 'bg-[rgb(var(--sakura-pink))]',
  indigo: 'bg-[rgb(var(--indigo-blue))]',
  terracotta: 'bg-[rgb(var(--terracotta))]',
  beige: 'bg-[rgb(var(--warm-beige))]',
};

export default function SectionTitle({ 
  title, 
  color = 'moss',
  className = '' 
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <h2 className={`text-3xl md:text-4xl font-light mb-4 tracking-wide ${colorClasses[color]}`}>
        {title}
      </h2>
      <div className={`h-0.5 w-20 ${colorBorders[color]} mb-12 md:mb-16 opacity-60`} />
    </motion.div>
  );
}

