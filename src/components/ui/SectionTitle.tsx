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
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className={`h-2 w-2 rounded-full ${colorBorders[color]} shadow-[0_0_24px_currentColor]`} />
        <h2 className={`text-3xl md:text-5xl font-semibold tracking-normal ${colorClasses[color]}`}>
          {title}
        </h2>
      </div>
      <div className={`h-px w-32 ${colorBorders[color]} mb-10 opacity-80`} />
    </motion.div>
  );
}
