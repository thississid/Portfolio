'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Check for interactive elements
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.neon-border') ||
        target.closest('.card-interactive')
      ) {
        setIsHovering(true);
        if (target.tagName === 'A' || target.closest('a')) {
          setCursorText('CLICK');
        } else if (target.tagName === 'BUTTON' || target.closest('button')) {
          setCursorText('CLICK');
        }
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    document.addEventListener('mouseover', handleMouseEnter, true);
    document.addEventListener('mouseout', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <div
          className={`w-full h-full rounded-full border-2 transition-all duration-300 ${
            isHovering
              ? 'bg-transparent border-[rgb(var(--neon-cyan))] scale-125'
              : 'bg-transparent border-[rgb(var(--neon-cyan))] scale-100'
          } ${isClicking ? 'scale-75' : ''}`}
          style={{
            boxShadow: isHovering 
              ? `0 0 8px rgb(var(--neon-cyan))`
              : `0 0 6px rgb(var(--neon-cyan))`,
          }}
        />
      </motion.div>

      {/* Cursor Trail */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <div className="w-full h-full rounded-full bg-[rgb(var(--neon-cyan))] opacity-50 blur-sm" />
      </motion.div>

      {/* Cursor Text */}
      {cursorText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="relative -translate-x-1/2 -translate-y-full -mt-4">
            <span className="text-xs font-mono font-bold text-[rgb(var(--neon-cyan))] whitespace-nowrap">
              {cursorText}
            </span>
          </div>
        </motion.div>
      )}
    </>
  );
}

