'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <Section id="contact" centerContent>
      <Container>
        <SectionTitle title="Get In Touch" color="sakura" />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6"
        >
          {/* Contact Info */}
          <Card borderColor="indigo" delay={0}>
            <h3 className="text-2xl font-semibold mb-6 text-[rgb(var(--neon-cyan))]">
              Contact Channels
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-md border border-[rgb(var(--neon-cyan))]/35 bg-[rgb(var(--neon-cyan))]/10 text-xs font-mono text-[rgb(var(--neon-cyan))]">EM</span>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">Email</p>
                  <a 
                    href="mailto:officialsiddartha@gmail.com"
                    className="text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-green))] transition-colors"
                  >
                    officialsiddartha@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-md border border-[rgb(var(--neon-green))]/35 bg-[rgb(var(--neon-green))]/10 text-xs font-mono text-[rgb(var(--neon-green))]">PH</span>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">Phone</p>
                  <a 
                    href="tel:+919032424033"
                    className="text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-green))] transition-colors"
                  >
                    +91 9032424033
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-md border border-[rgb(var(--neon-pink))]/35 bg-[rgb(var(--neon-pink))]/10 text-xs font-mono text-[rgb(var(--neon-pink))]">IN</span>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">LinkedIn</p>
                  <a 
                    href="https://linkedin.com/in/thississid"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my LinkedIn profile"
                    className="text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-green))] transition-colors min-h-[44px] inline-flex items-center"
                  >
                    linkedin.com/in/thississid
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-md border border-[rgb(var(--warm-beige))]/35 bg-[rgb(var(--warm-beige))]/10 text-xs font-mono text-[rgb(var(--warm-beige))]">GH</span>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">GitHub</p>
                  <a 
                    href="https://github.com/thississid"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my GitHub profile"
                    className="text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-green))] transition-colors min-h-[44px] inline-flex items-center"
                  >
                    github.com/thississid
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <Card borderColor="terracotta" delay={0.08}>
            <h3 className="text-2xl font-semibold mb-6 text-[rgb(var(--neon-pink))]">
              Start a Thread
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-[rgb(var(--text-secondary))]">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))]/75 px-4 py-3 text-[rgb(var(--text-primary))] transition-colors focus:border-[rgb(var(--neon-cyan))] focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-[rgb(var(--text-secondary))]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))]/75 px-4 py-3 text-[rgb(var(--text-primary))] transition-colors focus:border-[rgb(var(--neon-cyan))] focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-[rgb(var(--text-secondary))]">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))]/75 px-4 py-3 text-[rgb(var(--text-primary))] transition-colors focus:border-[rgb(var(--neon-cyan))] focus:outline-none resize-none"
                  placeholder="Your message..."
                />
              </div>

              {status === 'success' && (
                <p className="text-[rgb(var(--moss-green))] text-sm">✓ Message sent successfully!</p>
              )}

              {status === 'error' && (
                <p className="text-[rgb(var(--sakura-pink))] text-sm">✗ {errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-md border border-[rgb(var(--neon-cyan))]/60 bg-[rgb(var(--neon-cyan))] px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-[rgb(var(--neon-green))] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card borderColor="moss" delay={0.08} className="mt-6 max-w-4xl mx-auto">
            <p className="text-[rgb(var(--neon-green))] mb-2 font-semibold">
              ✓ Available for Opportunities
            </p>
            <p className="text-[rgb(var(--text-secondary))]">
              Open to full-time positions, freelance projects, and collaboration opportunities 
              in AI/ML, full-stack development, and cloud technologies.
            </p>
          </Card>
        </motion.div>
      </Container>
    </Section>
  );
}
