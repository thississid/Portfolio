'use client';

import { ReactNode, useRef } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  centerContent?: boolean;
}

export default function Section({ 
  id, 
  children, 
  className = '', 
  centerContent = false
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef}
      id={id} 
      className={`min-h-screen py-20 md:py-28 relative border-t border-[rgb(var(--border))]/70 ${centerContent ? 'flex items-center' : ''} ${className}`}
    >
      {children}
    </section>
  );
}

