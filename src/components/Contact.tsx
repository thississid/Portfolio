'use client';

import { motion } from 'framer-motion';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';
import ShootingStars from './ui/ShootingStars';

export default function Contact() {
  return (
    <Section id="contact" centerContent>
      <ShootingStars count={3} />
      <Container>
        <SectionTitle title="<CONTACT />" color="pink" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Card borderColor="cyan" delay={0}>
            <h3 className="text-2xl font-bold mb-6 neon-text-cyan font-mono">
              {'> GET_IN_TOUCH()'}
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">Email</p>
                  <a 
                    href="mailto:officialsiddartha@gmail.com"
                    className="text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-pink))] transition-colors font-mono"
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
                    className="text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-pink))] transition-colors font-mono"
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
                    className="text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-pink))] transition-colors font-mono"
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
                    className="text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-pink))] transition-colors font-mono"
                  >
                    github.com/thississid
                  </a>
                </div>
              </div>
            </div>
          </Card>

          <Card borderColor="purple" delay={0.3} className="mt-6 border bg-opacity-30">
            <p className="text-[rgb(var(--neon-green))] font-mono mb-2">
              {'> STATUS: AVAILABLE_FOR_OPPORTUNITIES'}
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

