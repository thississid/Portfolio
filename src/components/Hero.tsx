'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'FULL-STACK DEVELOPER | AI/ML SPECIALIST';

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 sm:pt-28 md:pt-32 px-4">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      <div className="max-w-5xl mx-auto z-10 w-full px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-[rgb(var(--neon-pink))] text-base md:text-lg"
          >
            {'> SYSTEM.INITIALIZE()'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 neon-text-cyan px-4 leading-tight"
          >
            GUNDELLY SIDDARTHA YADAV
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 min-h-8 font-mono text-[rgb(var(--neon-green))] px-4"
          >
            {displayText}
            <span className="animate-pulse">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto mb-12 px-4"
          >
            Building the future with AI/ML, LLM integration, and cloud-based solutions.
            Specializing in autonomous systems and cutting-edge technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-4 justify-center px-4"
          >
            <a
              href="#contact"
              className="relative px-8 py-3 neon-border bg-transparent hover:bg-[rgb(var(--neon-cyan))] hover:bg-opacity-10 transition-all duration-300 text-[rgb(var(--neon-cyan))] font-bold uppercase tracking-wider group overflow-hidden"
            >
              <span className="relative z-10">{'> CONNECT'}</span>
              <span className="absolute inset-0 bg-[rgb(var(--neon-cyan))] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            </a>
            <a
              href="#projects"
              className="relative px-8 py-3 border-2 border-[rgb(var(--neon-pink))] bg-transparent hover:bg-[rgb(var(--neon-pink))] hover:bg-opacity-10 hover:shadow-[0_0_20px_rgb(var(--neon-pink))] transition-all duration-300 text-[rgb(var(--neon-pink))] font-bold uppercase tracking-wider group overflow-hidden"
            >
              <span className="relative z-10">{'> VIEW WORK'}</span>
              <span className="absolute inset-0 bg-[rgb(var(--neon-pink))] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            </a>
          </motion.div>

          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-20 h-20 border border-[rgb(var(--neon-purple))] opacity-30 animate-spin-slow" />
          <div className="absolute bottom-20 right-10 w-16 h-16 border border-[rgb(var(--neon-pink))] opacity-30 animate-bounce-slow" />
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
