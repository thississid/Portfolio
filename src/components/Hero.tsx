'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Container from './ui/Container';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'AI Engineer • ML Systems • Applied Research';
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
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-left max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 text-xs md:text-sm tracking-[0.3em] uppercase text-[rgb(var(--text-secondary))]"
          >
            Portfolio / AI Engineer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-6 text-[rgb(var(--text-primary))] leading-[0.95] tracking-[-0.04em] max-w-4xl"
          >
            Gundelly Siddartha Yadav
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-base sm:text-lg md:text-xl mb-8 min-h-10 text-[rgb(var(--text-secondary))]"
          >
            {displayText}
            <span className="terminal-cursor ml-1 opacity-70">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-base sm:text-lg text-[rgb(var(--text-secondary))] max-w-2xl mb-10 leading-relaxed"
          >
            I build practical AI systems, LLM workflows, and production software with a strong focus on reliability, clarity, and measurable outcomes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            <a
              href="#contact"
              className="px-6 py-3 brush-border bg-transparent text-[rgb(var(--text-primary))] rounded-none hover:bg-[rgb(var(--bg-secondary))] transition-all duration-300 text-sm tracking-[0.12em] uppercase"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="px-6 py-3 brush-border-sakura bg-transparent text-[rgb(var(--text-primary))] rounded-none hover:bg-[rgb(var(--bg-secondary))] transition-all duration-300 text-sm tracking-[0.12em] uppercase"
            >
              View Work
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

