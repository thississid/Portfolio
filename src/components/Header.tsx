'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

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
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-500 ease-out border-b border-[rgb(var(--border))]/60 ${
        scrolled 
          ? 'bg-[rgb(var(--bg-primary))]/88 backdrop-blur-xl shadow-[0_18px_60px_rgba(22,38,66,0.14)]' 
          : 'bg-[rgb(var(--bg-primary))]/72 backdrop-blur-xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-semibold tracking-[0.2em] uppercase text-[rgb(var(--text-primary))] flex items-center gap-2 z-50"
          >
            <span className="grid h-9 w-9 place-items-center rounded-md border border-[rgb(var(--neon-cyan))]/50 bg-[rgb(var(--neon-cyan))]/10 text-[rgb(var(--neon-cyan))] shadow-[0_0_28px_rgba(34,211,238,0.18)]">SY</span>
            <span className="hidden sm:inline">AI Engineer</span>
          </motion.a>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.05 + index * 0.025, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs tracking-[0.12em] uppercase text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--neon-cyan))] transition-colors relative group py-2 min-h-[44px] flex items-center"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[rgb(var(--neon-cyan))] group-hover:w-full transition-[width] duration-500 ease-out" />
              </motion.a>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 lg:gap-3"
          >
            <a
              href="/Siddartha_Yadav_Resume.pdf"
              download
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 min-h-[44px] border border-[rgb(var(--neon-cyan))]/45 text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--neon-cyan))]/10 transition-all rounded-md text-xs tracking-[0.12em] uppercase"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden xl:inline">Resume</span>
            </a>
            <a
              href="https://github.com/thississid"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
              className="hidden lg:flex items-center min-h-[44px] px-2 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--neon-cyan))] transition-colors text-xs tracking-[0.12em] uppercase"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/thississid"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
              className="hidden xl:flex items-center min-h-[44px] px-2 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--neon-cyan))] transition-colors text-xs tracking-[0.12em] uppercase"
            >
              LinkedIn
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center min-h-[44px] min-w-[44px] text-[rgb(var(--text-primary))] z-50"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed top-16 left-0 right-0 bg-[rgb(var(--bg-primary))]/95 backdrop-blur-sm border-b border-[rgb(var(--border))] overflow-y-auto"
          >
            <nav className="flex flex-col px-4 py-6 gap-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.025, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm tracking-[0.12em] uppercase text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-secondary))] transition-all py-3 px-4 rounded-none"
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="flex flex-col gap-3 mt-6 px-4">
                <a
                  href="/Siddartha_Yadav_Resume.pdf"
                  download
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-tertiary))] transition-all rounded-none text-sm tracking-[0.12em] uppercase border border-[rgb(var(--border))]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </a>
                
                <div className="flex gap-3">
                  <a
                    href="https://github.com/thississid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-tertiary))] transition-all rounded-none text-sm tracking-[0.12em] uppercase border border-[rgb(var(--border))]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/thississid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-tertiary))] transition-all rounded-none text-sm tracking-[0.12em] uppercase border border-[rgb(var(--border))]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
