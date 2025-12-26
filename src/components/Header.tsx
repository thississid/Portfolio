'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-[rgb(var(--bg-primary))] bg-opacity-95 backdrop-blur-md border-[rgb(var(--neon-cyan))] shadow-[0_4px_20px_rgba(0,255,255,0.1)]' 
          : 'bg-[rgb(var(--bg-primary))] bg-opacity-80 backdrop-blur-sm border-[rgb(var(--neon-cyan))] border-opacity-30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-bold neon-text-cyan font-mono"
          >
            {'<SIDDARTHA />'}
          </motion.a>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-sm font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--neon-cyan))] transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(var(--neon-cyan))] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4"
          >
            <a
              href="https://github.com/thississid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(var(--neon-green))] hover:text-[rgb(var(--neon-pink))] transition-colors text-sm font-mono"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/thississid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(var(--neon-green))] hover:text-[rgb(var(--neon-pink))] transition-colors text-sm font-mono"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

