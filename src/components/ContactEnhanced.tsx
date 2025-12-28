'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';
import ShootingStars from './ui/ShootingStars';

export default function ContactEnhanced() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showCalendly, setShowCalendly] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrorMessage('File size must be less than 5MB');
        setStatus('error');
        setTimeout(() => {
          setStatus('idle');
          setErrorMessage('');
        }, 5000);
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      
      if (file) {
        formDataToSend.append('file', file);
      }

      const response = await fetch('/api/contact-enhanced', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setFile(null);
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const openCalendly = () => {
    setShowCalendly(true);
  };

  return (
    <Section id="contact" centerContent>
      <ShootingStars count={3} />
      <Container>
        <SectionTitle title="Get In Touch" color="pink" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <h3 className="text-2xl font-bold mb-4 text-[rgb(var(--neon-cyan))]">
                Send a Message
              </h3>
              <p className="text-gray-400 mb-6">
                Have a project in mind? Fill out the form below, and I'll get back to you soon.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none transition-all"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label htmlFor="file-upload" className="block text-sm font-medium mb-2">
                    Attach File (Optional)
                    <span className="text-xs text-gray-500 ml-2">Max 5MB</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="file-upload"
                      aria-label="Choose a file to attach"
                      className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg hover:border-opacity-100 cursor-pointer transition-all min-h-[44px]"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                      <span className="text-sm">
                        {file ? file.name : 'Choose a file'}
                      </span>
                    </label>
                    {file && (
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        aria-label="Remove attached file"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[rgb(var(--neon-cyan))] to-[rgb(var(--neon-purple))] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg text-green-400 text-sm"
                  >
                    ✓ Message sent successfully! Check your email for confirmation.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-400 text-sm"
                  >
                    ✗ {errorMessage || 'Failed to send message. Please try again.'}
                  </motion.div>
                )}
              </form>
            </Card>

            {/* Calendly & Quick Contact */}
            <div className="space-y-6">
              {/* Calendly Card */}
              <Card>
                <h3 className="text-2xl font-bold mb-4 text-[rgb(var(--neon-green))]">
                  Schedule a Call
                </h3>
                <p className="text-gray-400 mb-6">
                  Prefer a quick chat? Schedule a call at your convenience.
                </p>
                <button
                  onClick={openCalendly}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[rgb(var(--neon-green))] to-[rgb(var(--neon-cyan))] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Book a Meeting
                </button>
              </Card>

              {/* Direct Contact Info */}
              <Card>
                <h3 className="text-2xl font-bold mb-4 text-[rgb(var(--neon-pink))]">
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:your.email@example.com"
                    aria-label="Send me an email"
                    className="flex items-center gap-3 text-gray-400 hover:text-[rgb(var(--neon-pink))] transition-colors min-h-[44px]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>your.email@example.com</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my LinkedIn profile"
                    className="flex items-center gap-3 text-gray-400 hover:text-[rgb(var(--neon-pink))] transition-colors min-h-[44px]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my GitHub profile"
                    className="flex items-center gap-3 text-gray-400 hover:text-[rgb(var(--neon-pink))] transition-colors min-h-[44px]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Calendly Modal */}
      {showCalendly && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setShowCalendly(false)}
        >
          <div
            className="relative w-full max-w-4xl h-[80vh] bg-white rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCalendly(false)}
              className="absolute top-4 right-4 z-10 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <iframe
              src="https://calendly.com/yourusername/30min"
              width="100%"
              height="100%"
              className="rounded-lg"
              frameBorder="0"
            />
          </div>
        </div>
      )}
    </Section>
  );
}
