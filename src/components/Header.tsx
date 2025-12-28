'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ThemeToggle from './ui/ThemeToggle';

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
    { label: 'Publications', href: '#publications' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-[rgb(var(--bg-primary))] bg-opacity-70 backdrop-blur-lg border-[rgb(var(--neon-cyan))] border-opacity-50 shadow-[0_4px_20px_rgba(0,200,220,0.1)]' 
          : 'bg-[rgb(var(--bg-primary))] bg-opacity-50 backdrop-blur-md border-[rgb(var(--neon-cyan))] border-opacity-30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-bold text-[rgb(var(--neon-cyan))]"
          >
            Siddartha Yadav
          </motion.a>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-sm font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--neon-cyan))] transition-colors relative group py-3 px-1 min-h-[44px] flex items-center"
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
            <ThemeToggle />
            <a
              href="/Siddartha_Yadav_Resume.pdf"
              download
              className="flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] min-w-[44px] border border-[rgb(var(--neon-cyan))] border-opacity-50 text-[rgb(var(--neon-cyan))] hover:border-opacity-100 transition-colors rounded-md text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">Resume</span>
            </a>
            <a
              href="https://github.com/thississid"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
              className="hidden md:flex items-center min-h-[44px] px-2 text-[rgb(var(--neon-green))] hover:text-[rgb(var(--neon-pink))] transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/thississid"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
              className="hidden md:flex items-center min-h-[44px] px-2 text-[rgb(var(--neon-green))] hover:text-[rgb(var(--neon-pink))] transition-colors text-sm"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

