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
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-px bg-[rgb(var(--border))]" />
        <h2 className={`text-2xl md:text-3xl font-medium tracking-[0.18em] uppercase ${colorClasses[color]}`}>
          {title}
        </h2>
      </div>
      <div className={`h-px w-24 ${colorBorders[color]} mb-10 opacity-100`} />
    </motion.div>
  );
}

