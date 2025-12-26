import { ReactNode } from 'react';

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
  return (
    <section 
      id={id} 
      className={`min-h-screen py-20 md:py-32 relative ${centerContent ? 'flex items-center' : ''} ${className}`}
    >
      {children}
    </section>
  );
}

