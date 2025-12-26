'use client';

import { motion } from 'framer-motion';
import { useState, useRef, MouseEvent } from 'react';

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
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const rippleIdRef = useRef(0);

  const handleClick = (e: MouseEvent) => {
    if (loading) return;

    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = rippleIdRef.current++;

      setRipples(prev => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 600);

      if (onClick) onClick();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePos({ x, y });
    }
  };

  const baseClasses = `relative px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 font-bold uppercase tracking-wider group overflow-hidden font-mono text-xs sm:text-sm md:text-base transition-all duration-300 ${
    variant === 'primary'
      ? 'neon-border bg-transparent text-[rgb(var(--neon-cyan))] hover:shadow-[0_0_15px_rgb(var(--neon-cyan))]'
      : 'border-2 border-[rgb(var(--neon-pink))] bg-transparent text-[rgb(var(--neon-pink))] hover:shadow-[0_0_15px_rgb(var(--neon-pink))]'
  }`;

  const buttonContent = (
    <>
      <span className="relative z-20">{children}</span>
      {/* Removed blur background - only border will glow */}
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-[rgb(var(--bg-secondary))] bg-opacity-50 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-6 h-6 border-2 border-[rgb(var(--neon-cyan))] border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="button-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            marginLeft: '-10px',
            marginTop: '-10px',
          }}
        />
      ))}
    </>
  );

  const style = {
    '--mx': `${mousePos.x * 0.1}px`,
    '--my': `${mousePos.y * 0.1}px`,
  } as React.CSSProperties;

  if (href) {
    return (
      <motion.a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`${baseClasses} button-magnetic ${className}`}
        style={style}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      className={`${baseClasses} button-magnetic ${className}`}
      style={style}
      disabled={loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {buttonContent}
    </motion.button>
  );
}

