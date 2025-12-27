'use client';

import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Matrix rain characters - mix of code symbols and binary
    const chars = '01アイウエオカキクケコサシスセソタチツテト</>{}[]();=+-*&|$@#';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let animationFrameId: number;

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(5, 5, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];

        // Color gradient - brighter at the tip
        const gradient = ctx.createLinearGradient(
          i * fontSize,
          drops[i] * fontSize,
          i * fontSize,
          (drops[i] + 1) * fontSize
        );
        
        // Cyan color with varying opacity
        gradient.addColorStop(0, 'rgba(0, 200, 220, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 200, 220, 0.8)');
        
        ctx.fillStyle = gradient;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Glow effect for the tip
        if (drops[i] * fontSize > 50 && Math.random() > 0.95) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(0, 200, 220, 0.8)';
          ctx.fillStyle = 'rgba(0, 200, 220, 1)';
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);
          ctx.shadowBlur = 0;
        }

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-5"
      style={{ background: 'transparent' }}
    />
  );
}
