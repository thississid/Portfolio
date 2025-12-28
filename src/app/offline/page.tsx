'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Offline() {
  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Offline Icon */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <svg
              className="w-32 h-32 text-[rgb(var(--neon-cyan))]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3"
              />
            </svg>
          </motion.div>

          {/* Message */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-[rgb(var(--neon-cyan))] to-[rgb(var(--neon-pink))] bg-clip-text text-transparent">
              You're Offline
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-[rgb(var(--text-secondary))] mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            It looks like you've lost your internet connection. Don't worry, you can still browse cached
            content or try reconnecting.
          </motion.p>

          {/* Action Button */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-[rgb(var(--neon-cyan))] text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] transform hover:scale-105"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-8 py-3 border border-[rgb(var(--neon-cyan))] border-opacity-50 text-[rgb(var(--neon-cyan))] rounded-lg hover:border-opacity-100 hover:bg-[rgb(var(--neon-cyan))] hover:bg-opacity-10 transition-all duration-300 font-semibold"
            >
              Go Home
            </Link>
          </motion.div>

          {/* Tip */}
          <motion.div
            className="mt-12 pt-8 border-t border-[rgb(var(--border))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm text-[rgb(var(--text-secondary))]">
              💡 Tip: Some content may be available offline from your previous visits
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
