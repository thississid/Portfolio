'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Number */}
          <motion.h1
            className="text-9xl font-bold mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-[rgb(var(--neon-cyan))] to-[rgb(var(--neon-pink))] bg-clip-text text-transparent">
              404
            </span>
          </motion.h1>

          {/* Error Message */}
          <motion.h2
            className="text-3xl font-bold text-[rgb(var(--text-primary))] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Page Not Found
          </motion.h2>

          <motion.p
            className="text-lg text-[rgb(var(--text-secondary))] mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </motion.p>

          {/* Navigation Links */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/"
              className="px-8 py-3 bg-[rgb(var(--neon-cyan))] text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] transform hover:scale-105"
            >
              Go Home
            </Link>
            <Link
              href="/#blog"
              className="px-8 py-3 border border-[rgb(var(--neon-cyan))] border-opacity-50 text-[rgb(var(--neon-cyan))] rounded-lg hover:border-opacity-100 hover:bg-[rgb(var(--neon-cyan))] hover:bg-opacity-10 transition-all duration-300 font-semibold"
            >
              Read Blog
            </Link>
            <Link
              href="/#contact"
              className="px-8 py-3 border border-[rgb(var(--neon-pink))] border-opacity-50 text-[rgb(var(--neon-pink))] rounded-lg hover:border-opacity-100 hover:bg-[rgb(var(--neon-pink))] hover:bg-opacity-10 transition-all duration-300 font-semibold"
            >
              Contact Me
            </Link>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            className="mt-12 pt-8 border-t border-[rgb(var(--border))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm text-[rgb(var(--text-secondary))] mb-4">
              Or explore these sections:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/#about"
                className="text-sm text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-pink))] transition-colors"
              >
                About
              </Link>
              <span className="text-[rgb(var(--text-secondary))]">•</span>
              <Link
                href="/#experience"
                className="text-sm text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-pink))] transition-colors"
              >
                Experience
              </Link>
              <span className="text-[rgb(var(--text-secondary))]">•</span>
              <Link
                href="/#projects"
                className="text-sm text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-pink))] transition-colors"
              >
                Projects
              </Link>
              <span className="text-[rgb(var(--text-secondary))]">•</span>
              <Link
                href="/#skills"
                className="text-sm text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-pink))] transition-colors"
              >
                Skills
              </Link>
              <span className="text-[rgb(var(--text-secondary))]">•</span>
              <Link
                href="/#certifications"
                className="text-sm text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-pink))] transition-colors"
              >
                Certifications
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
