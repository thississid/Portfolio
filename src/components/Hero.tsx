'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Container from './ui/Container';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Agentic AI • LLM Systems • Production ML';
  const sectionRef = useRef<HTMLElement>(null);
  const ease = [0.16, 1, 0.3, 1] as const;

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
      <div className="absolute inset-x-0 top-24 mx-auto h-72 max-w-5xl rounded-full bg-[rgb(var(--neon-cyan))]/10 blur-3xl" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, ease }}
          className="text-left max-w-6xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="mb-6 inline-flex max-w-full items-center gap-3 rounded-full border border-[rgb(var(--neon-green))]/35 bg-[rgb(var(--neon-green))]/10 px-4 py-2 text-[0.68rem] sm:text-xs md:text-sm tracking-[0.12em] sm:tracking-[0.18em] uppercase text-[rgb(var(--neon-green))]"
          >
            AI Engineer / Applied Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.14, ease }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold mb-6 text-[rgb(var(--text-primary))] leading-[0.96] sm:leading-[0.92] tracking-normal max-w-5xl"
          >
            Hi, I&apos;m Siddartha. I build AI systems that ship.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.22, ease }}
            className="font-mono text-sm sm:text-lg md:text-xl mb-8 min-h-10 text-[rgb(var(--neon-cyan))]"
          >
            {displayText}
            <span className="ml-1 opacity-50">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.28, ease }}
            className="text-base sm:text-lg md:text-xl text-[rgb(var(--text-secondary))] max-w-3xl mb-8 sm:mb-10 leading-relaxed"
          >
            I turn messy business problems into reliable LLM workflows, ML backends, governance dashboards, and agentic prototypes with the taste of a builder and the discipline of an engineer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.34, ease }}
            className="mb-8 grid max-w-4xl grid-cols-2 gap-3 sm:mb-10 sm:grid-cols-4"
          >
            {['LLM cost analytics', 'AI governance', 'RAG + agents', 'Production APIs'].map((item) => (
              <div key={item} className="rounded-lg border border-[rgb(var(--border))]/70 bg-[rgb(var(--surface))]/86 px-3 py-3 text-sm font-medium text-[rgb(var(--text-secondary))] backdrop-blur sm:px-4">
                {item}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.4, ease }}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            <a
              href="#contact"
              className="flex-1 px-5 py-3 text-center border border-[rgb(var(--neon-cyan))]/60 bg-[rgb(var(--neon-cyan))] text-slate-950 rounded-md hover:bg-[rgb(var(--neon-green))] hover:border-[rgb(var(--neon-green))] transition-all duration-300 text-sm font-semibold tracking-[0.08em] uppercase sm:flex-none sm:px-6"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="flex-1 px-5 py-3 text-center border border-[rgb(var(--border))] bg-[rgb(var(--surface))]/75 text-[rgb(var(--text-primary))] rounded-md hover:border-[rgb(var(--neon-cyan))] hover:bg-[rgb(var(--neon-cyan))]/10 transition-all duration-300 text-sm tracking-[0.08em] uppercase sm:flex-none sm:px-6"
            >
              View Work
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
