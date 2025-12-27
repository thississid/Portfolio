'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';
import ShootingStars from './ui/ShootingStars';

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
      <ShootingStars count={3} />
      <Container>
        <SectionTitle title="Get In Touch" color="pink" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6"
        >
          {/* Contact Info */}
          <Card borderColor="cyan" delay={0}>
            <h3 className="text-2xl font-bold mb-6 text-[rgb(var(--neon-cyan))]">
              Contact Info
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">Email</p>
                  <a 
                    href="mailto:officialsiddartha@gmail.com"
                    className="text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-pink))] transition-colors"
                  >
                    officialsiddartha@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">Phone</p>
                  <a 
                    href="tel:+919032424033"
                    className="text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-pink))] transition-colors"
                  >
                    +91 9032424033
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-2xl">💼</span>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">LinkedIn</p>
                  <a 
                    href="https://linkedin.com/in/thississid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-pink))] transition-colors"
                  >
                    linkedin.com/in/thississid
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-2xl">💻</span>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">GitHub</p>
                  <a 
                    href="https://github.com/thississid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-pink))] transition-colors"
                  >
                    github.com/thississid
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <Card borderColor="purple" delay={0.2}>
            <h3 className="text-2xl font-bold mb-6 text-[rgb(var(--neon-purple))]">
              Send a Message
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
                  className="w-full px-4 py-2 bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-md focus:border-opacity-100 focus:outline-none transition-colors text-[rgb(var(--text-primary))]"
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
                  className="w-full px-4 py-2 bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-md focus:border-opacity-100 focus:outline-none transition-colors text-[rgb(var(--text-primary))]"
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
                  className="w-full px-4 py-2 bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-md focus:border-opacity-100 focus:outline-none transition-colors text-[rgb(var(--text-primary))] resize-none"
                  placeholder="Your message..."
                />
              </div>

              {status === 'success' && (
                <p className="text-[rgb(var(--neon-green))] text-sm">✓ Message sent successfully!</p>
              )}

              {status === 'error' && (
                <p className="text-[rgb(var(--neon-pink))] text-sm">✗ {errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-6 py-3 border border-[rgb(var(--neon-purple))] border-opacity-50 text-[rgb(var(--neon-purple))] hover:border-opacity-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md font-medium"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card borderColor="green" delay={0.4} className="mt-6 max-w-4xl mx-auto">
            <p className="text-[rgb(var(--neon-green))] mb-2 font-medium">
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

