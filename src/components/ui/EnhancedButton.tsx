'use client';

import { motion } from 'framer-motion';

interface EnhancedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

export default function EnhancedButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  loading = false,
}: EnhancedButtonProps) {
  const baseClasses = `relative px-6 py-3 font-medium transition-all duration-300 rounded-lg ${
    variant === 'primary'
      ? 'bg-[rgb(var(--neon-cyan))] text-white hover:bg-opacity-90'
      : 'border border-[rgb(var(--neon-cyan))] text-[rgb(var(--neon-cyan))] hover:bg-[rgb(var(--neon-cyan))] hover:bg-opacity-10'
  } ${className}`;

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={baseClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        children
      )}
    </Component>
  );
}

