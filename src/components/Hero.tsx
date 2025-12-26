'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Container from './ui/Container';
import ShootingStars from './ui/ShootingStars';
import InteractiveNeuralNetwork from './ui/InteractiveNeuralNetwork';
import EnhancedButton from './ui/EnhancedButton';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'AI/ML SPECIALIST | FULL-STACK DEVELOPER';
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
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <ShootingStars count={4} />
      <InteractiveNeuralNetwork nodeCount={15} containerRef={sectionRef} />
      {/* AI Data Streams Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="data-stream"
            style={{
              left: `${20 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Neural Network Nodes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[rgb(var(--neon-cyan))] rounded-full neural-node"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 30}%`,
            animationDelay: `${i * 0.3}s`,
            boxShadow: `0 0 10px rgb(var(--neon-cyan))`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      <Container className="relative z-10">
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
            className="mb-6 text-[rgb(var(--neon-pink))] text-base md:text-lg font-mono"
          >
            {'> SYSTEM.INITIALIZE()'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 neon-text-cyan leading-tight font-mono"
          >
            GUNDELLY SIDDARTHA YADAV
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 min-h-10 font-mono text-[rgb(var(--neon-green))]"
          >
            {displayText}
            <span className="terminal-cursor ml-1">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-[rgb(var(--text-secondary))] max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Full-stack developer with experience in AI/ML, LLM integration, and cloud-based application deployment.
            Specializing in autonomous systems and cutting-edge technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-3 sm:gap-4 justify-center"
          >
            <EnhancedButton href="#contact" variant="primary">
              {'> CONNECT'}
            </EnhancedButton>
            <EnhancedButton href="#projects" variant="secondary">
              {'> VIEW WORK'}
            </EnhancedButton>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scan Lines Overlay */}
      <div className="scanlines" />
    </section>
  );
}

