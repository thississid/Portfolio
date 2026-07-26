'use client';

import { motion } from 'framer-motion';
import Container from './ui/Container';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgb(var(--border))]/60 bg-[rgb(var(--surface))]/70 backdrop-blur-xl w-full">
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
              className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--neon-cyan))] transition-colors min-h-[44px] flex items-center px-2 text-xs tracking-[0.12em] uppercase"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/thississid"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
              className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--neon-cyan))] transition-colors min-h-[44px] flex items-center px-2 text-xs tracking-[0.12em] uppercase"
            >
              LinkedIn
            </a>
            <a
              href="mailto:officialsiddartha@gmail.com"
              aria-label="Send me an email"
              className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--neon-cyan))] transition-colors min-h-[44px] flex items-center px-2 text-xs tracking-[0.12em] uppercase"
            >
              Email
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[rgb(var(--text-secondary))] text-sm"
          >
            © {currentYear} <span className="text-[rgb(var(--neon-cyan))]">Gundelly Siddartha Yadav</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.18em] uppercase text-[rgb(var(--text-secondary))]"
          >
            {'AI engineer portfolio'}
          </motion.div>
        </div>
      </Container>
    </footer>
  );
}
