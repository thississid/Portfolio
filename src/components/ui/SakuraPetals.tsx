'use client';

import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export default function SakuraPetals({ count = 15 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generatePetals = () => {
      const newPetals: Petal[] = [];
      for (let i = 0; i < count; i++) {
        newPetals.push({
          id: Date.now() + i + Math.random() * 1000,
          left: Math.random() * 100,
          delay: Math.random() * 8,
          duration: 12 + Math.random() * 8,
          size: 16 + Math.random() * 12,
          rotation: Math.random() * 360,
        });
      }
      setPetals(newPetals);
    };

    generatePetals();
    const interval = setInterval(generatePetals, 20000);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="sakura-petal absolute"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            transform: `rotate(${petal.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
