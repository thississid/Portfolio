'use client';

import { ReactNode, useRef } from 'react';
import InteractiveNeuralNetwork from './InteractiveNeuralNetwork';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  centerContent?: boolean;
  showNeuralNetwork?: boolean;
}

export default function Section({ 
  id, 
  children, 
  className = '', 
  centerContent = false,
  showNeuralNetwork = false
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef}
      id={id} 
      className={`min-h-screen py-20 md:py-32 relative ${centerContent ? 'flex items-center' : ''} ${className}`}
    >
      {showNeuralNetwork && (
        <InteractiveNeuralNetwork nodeCount={10} containerRef={sectionRef} />
      )}
      {children}
    </section>
  );
}

