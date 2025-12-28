'use client';

import { motion } from 'framer-motion';
import Container from './ui/Container';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgb(var(--neon-cyan))] bg-[rgb(var(--bg-secondary))] bg-opacity-50 backdrop-blur-sm w-full">
      <Container className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
              aria-label="Visit my GitHub profile"
              className="text-[rgb(var(--neon-green))] hover:text-[rgb(var(--neon-pink))] transition-colors font-mono min-h-[44px] flex items-center px-2"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/thississid"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
              className="text-[rgb(var(--neon-green))] hover:text-[rgb(var(--neon-pink))] transition-colors font-mono min-h-[44px] flex items-center px-2"
            >
              LinkedIn
            </a>
            <a
              href="mailto:officialsiddartha@gmail.com"
              aria-label="Send me an email"
              className="text-[rgb(var(--neon-green))] hover:text-[rgb(var(--neon-pink))] transition-colors font-mono min-h-[44px] flex items-center px-2"
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
            © {currentYear} <span className="neon-text-pink">GUNDELLY SIDDARTHA YADAV</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm text-[rgb(var(--neon-cyan))] font-mono"
          >
            {'> SYSTEM.STATUS: ONLINE'}
          </motion.div>
        </div>
      </Container>
    </footer>
  );
}

