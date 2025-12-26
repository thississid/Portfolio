'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - placeholder for now
    console.log('Form submitted:', formData);
    alert('Message sent! (This is a placeholder - implement your backend)');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="min-h-screen py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 neon-text-pink">
            {'<CONTACT_ME />'}
          </h2>
          <div className="h-1 w-24 md:w-32 bg-[rgb(var(--neon-pink))] mb-8 md:mb-12 shadow-[0_0_10px_rgb(var(--neon-pink))]" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="neon-border p-6 bg-[rgb(var(--bg-secondary))] bg-opacity-50 backdrop-blur-sm mb-6">
              <h3 className="text-2xl font-bold mb-6 neon-text-cyan">
                {'> GET_IN_TOUCH()'}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-[rgb(var(--neon-pink))]">📧</span>
                  <div>
                    <p className="text-sm text-[rgb(var(--text-secondary))]">Email</p>
                    <a 
                      href="mailto:officialsiddartha@gmail.com"
                      className="text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-pink))] transition-colors"
                    >
                      officialsiddartha@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[rgb(var(--neon-pink))]">📱</span>
                  <div>
                    <p className="text-sm text-[rgb(var(--text-secondary))]">Phone</p>
                    <a 
                      href="tel:+919032424033"
                      className="text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-pink))] transition-colors"
                    >
                      +91 9032424033
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[rgb(var(--neon-pink))]">💼</span>
                  <div>
                    <p className="text-sm text-[rgb(var(--text-secondary))]">LinkedIn</p>
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
                  <span className="text-[rgb(var(--neon-pink))]">💻</span>
                  <div>
                    <p className="text-sm text-[rgb(var(--text-secondary))]">GitHub</p>
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
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="border border-[rgb(var(--neon-purple))] p-6 bg-[rgb(var(--bg-secondary))] bg-opacity-30"
            >
              <p className="text-[rgb(var(--neon-green))] font-mono mb-2">
                {'> STATUS: AVAILABLE_FOR_OPPORTUNITIES'}
              </p>
              <p className="text-[rgb(var(--text-secondary))]">
                Open to full-time positions, freelance projects, and collaboration opportunities 
                in AI/ML, full-stack development, and cloud technologies.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="neon-border p-6 bg-[rgb(var(--bg-secondary))] bg-opacity-50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 neon-text-purple">
                {'> SEND_MESSAGE()'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[rgb(var(--text-secondary))] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[rgb(var(--bg-primary))] border border-[rgb(var(--neon-cyan))] p-3 text-[rgb(var(--text-primary))] focus:border-[rgb(var(--neon-pink))] focus:outline-none focus:shadow-[0_0_10px_rgb(var(--neon-pink))] transition-all"
                    placeholder="Your name..."
                  />
                </div>

                <div>
                  <label className="block text-sm text-[rgb(var(--text-secondary))] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[rgb(var(--bg-primary))] border border-[rgb(var(--neon-cyan))] p-3 text-[rgb(var(--text-primary))] focus:border-[rgb(var(--neon-pink))] focus:outline-none focus:shadow-[0_0_10px_rgb(var(--neon-pink))] transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[rgb(var(--text-secondary))] mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-[rgb(var(--bg-primary))] border border-[rgb(var(--neon-cyan))] p-3 text-[rgb(var(--text-primary))] focus:border-[rgb(var(--neon-pink))] focus:outline-none focus:shadow-[0_0_10px_rgb(var(--neon-pink))] transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-3 neon-border bg-transparent hover:bg-[rgb(var(--neon-cyan))] hover:bg-opacity-10 transition-all duration-300 text-[rgb(var(--neon-cyan))] font-bold uppercase tracking-wider"
                >
                  {'> SEND_MESSAGE'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
