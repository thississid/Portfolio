'use client';

import { useEffect, useState } from 'react';

interface ShootingStar {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  angle: number;
  trailLength: number;
}

const colors = [
  'rgb(var(--neon-cyan))',
  'rgb(var(--neon-pink))',
  'rgb(var(--neon-purple))',
  'rgb(var(--neon-green))',
  'rgb(var(--accent-ai))',
];

export default function ShootingStars({ count = 3 }: { count?: number }) {
  const [stars, setStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: ShootingStar[] = [];
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: Date.now() + i + Math.random() * 1000,
          left: Math.random() * 100,
          delay: Math.random() * 4,
          duration: 1.5 + Math.random() * 2.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: (Math.random() - 0.5) * 45,
          trailLength: 50 + Math.random() * 100,
        });
      }
      setStars(newStars);
    };

    generateStars();
    const interval = setInterval(generateStars, 6000);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            left: `${star.left}%`,
            '--star-color': star.color,
            '--star-delay': `${star.delay}s`,
            '--star-duration': `${star.duration}s`,
            '--star-angle': `${star.angle}deg`,
            '--trail-length': `${star.trailLength}px`,
          } as React.CSSProperties}
        >
          <div className="shooting-star-trail" />
        </div>
      ))}
    </div>
  );
}

