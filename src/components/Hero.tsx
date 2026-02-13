'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Container from './ui/Container';
import SakuraPetals from './ui/SakuraPetals';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'AI/ML Specialist • Full-Stack Developer';
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 60);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <SakuraPetals count={20} />

      {/* Gentle decorative circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2 opacity-20 zen-circle"
          style={{
            left: `${15 + i * 30}%`,
            top: `${25 + (i % 2) * 35}%`,
            width: `${60 + i * 30}px`,
            height: `${60 + i * 30}px`,
            borderColor: i % 2 === 0 ? 'rgb(var(--sakura-pink))' : 'rgb(var(--moss-green))',
          }}
        />
      ))}

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 text-[rgb(var(--sakura-pink))] text-sm md:text-base tracking-wider"
          >
            ようこそ • Welcome
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light mb-8 text-[rgb(var(--text-primary))] leading-tight tracking-wide"
          >
            Gundelly Siddartha Yadav
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-10 min-h-10 text-[rgb(var(--moss-green))]"
          >
            {displayText}
            <span className="terminal-cursor ml-1 opacity-70">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-base sm:text-lg md:text-xl text-[rgb(var(--text-secondary))] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
          >
            Crafting elegant solutions through AI/ML, LLM integration, and cloud-based applications.
            <br />Specializing in autonomous systems with mindful design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap gap-4 sm:gap-6 justify-center"
          >
            <a
              href="#contact"
              className="px-8 py-3 brush-border bg-transparent text-[rgb(var(--moss-green))] rounded-sm hover:bg-[rgb(var(--moss-green))] hover:text-white transition-all duration-300"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="px-8 py-3 brush-border-sakura bg-transparent text-[rgb(var(--sakura-pink))] rounded-sm hover:bg-[rgb(var(--sakura-pink))] hover:text-white transition-all duration-300"
            >
              View Work
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

