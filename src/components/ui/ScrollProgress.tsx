'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[rgb(var(--neon-cyan))] via-[rgb(var(--neon-purple))] to-[rgb(var(--neon-pink))] origin-left z-[100] shadow-[0_0_10px_rgb(var(--neon-cyan))]"
      style={{ scaleX }}
    />
  );
}
