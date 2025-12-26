'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgb(var(--neon-cyan))] bg-[rgb(var(--bg-secondary))] bg-opacity-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[rgb(var(--text-secondary))]"
          >
            <p className="font-mono">
              {'<'}<span className="neon-text-cyan">Built with Next.js, TypeScript & Framer Motion</span>{' />'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            <a
              href="https://github.com/thississid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(var(--neon-green))] hover:text-[rgb(var(--neon-pink))] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/thississid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(var(--neon-green))] hover:text-[rgb(var(--neon-pink))] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:officialsiddartha@gmail.com"
              className="text-[rgb(var(--neon-green))] hover:text-[rgb(var(--neon-pink))] transition-colors"
            >
              Email
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[rgb(var(--text-secondary))] font-mono"
          >
            © {currentYear} <span className="neon-text-pink">SIDDARTHA YADAV</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-6 text-sm text-[rgb(var(--neon-cyan))] font-mono"
        >
          {'> SYSTEM.STATUS: ONLINE'}
        </motion.div>
      </div>
    </footer>
  );
}
