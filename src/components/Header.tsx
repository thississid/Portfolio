'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleMusic = () => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement;
    if (audio) {
      if (isMusicPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 border-b border-[rgb(var(--neon-cyan))] border-opacity-20 ${
        scrolled ? 'bg-[rgb(var(--bg-primary))] bg-opacity-98 backdrop-blur-md shadow-[0_4px_20px_rgba(0,255,255,0.1)]' : 'bg-[rgb(var(--bg-primary))] bg-opacity-80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <a href="#" className="text-base sm:text-lg md:text-xl font-bold neon-text-cyan whitespace-nowrap">
              {'<SIDDARTHA />'}
            </a>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-sm font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--neon-cyan))] transition-colors relative group whitespace-nowrap"
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute inset-0 bg-[rgb(var(--neon-cyan))] opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              </motion.a>
            ))}
          </nav>

          {/* Right side controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 sm:gap-4"
          >
            {/* Music Toggle */}
            <button
              onClick={toggleMusic}
              className="p-1 text-[rgb(var(--neon-purple))] hover:text-[rgb(var(--neon-pink))] transition-colors"
              title={isMusicPlaying ? 'Pause Music' : 'Play Music'}
              aria-label="Toggle music"
            >
              <span className="text-lg sm:text-xl">{isMusicPlaying ? '🔊' : '🔇'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1 text-[rgb(var(--neon-green))] hover:text-[rgb(var(--neon-pink))] transition-colors"
              title={isDark ? 'Light Mode' : 'Dark Mode'}
              aria-label="Toggle theme"
            >
              <span className="text-lg sm:text-xl">{isDark ? '☀️' : '🌙'}</span>
            </button>

            {/* Social Links */}
            <a
              href="https://github.com/thississid"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block text-sm font-medium text-[rgb(var(--neon-green))] hover:text-[rgb(var(--neon-pink))] transition-colors whitespace-nowrap"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/thississid"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block text-sm font-medium text-[rgb(var(--neon-green))] hover:text-[rgb(var(--neon-pink))] transition-colors whitespace-nowrap"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
