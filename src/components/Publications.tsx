'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';
import ShootingStars from './ui/ShootingStars';

const publications = [
  {
    title: 'Enhancing Remaining Useful Life Prediction',
    subtitle: 'A Comparative Study of Classical Machine Learning and Generative AI',
    venue: 'Springer CCIS Series • ThinkAI\'24 Conference',
    period: 'June 2024 – Dec. 2024',
    supervisor: 'Ravi Katukam (Ravi.k@arthink.ai)',
    abstract: 'This research paper endeavors to develop and compare predictive models for estimating the Remaining Useful Life (RUL) of manufacturing and engineering systems through the utilization of sensor data. The datasets employed in this study encompass simulated operational and sensor measurements gathered from machinery subjected to diverse operational conditions and fault modes. The primary objective of this investigation is to ascertain the efficacy of conventional machine learning (ML) techniques, specifically Long Short-Term Memory networks (LSTMs), for time series analysis and RUL prediction. Furthermore, generative AI models, such as Generative pretrained transformers (GPTs), are explored for their potential to augment fault detection and RUL estimation accuracy.',
  },
];

export default function Publications() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAbstract = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Section id="publications" centerContent>
      <ShootingStars count={3} />
      <Container>
        <SectionTitle title="<PUBLICATIONS />" color="purple" />

        <div className="space-y-8 md:space-y-12">
          {publications.map((publication, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--neon-purple))] to-[rgb(var(--neon-pink))] opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-500" />
              
              <Card
                borderColor="purple"
                delay={index * 0.2}
                className="relative bg-opacity-70 hover:shadow-[0_0_40px_rgba(147,51,234,0.4)]"
              >
                <div className="border-l-2 border-[rgb(var(--neon-purple))] pl-6">
                  <h3 className="text-2xl font-bold text-[rgb(var(--neon-purple))] mb-3 font-mono">
                    {publication.title}
                  </h3>
                  
                  <p className="text-lg text-[rgb(var(--text-primary))] mb-4">
                    {publication.subtitle}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-[rgb(var(--neon-green))] font-mono">
                      {publication.venue}
                    </p>
                    
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-sm text-[rgb(var(--text-secondary))]">
                      <span className="font-mono">
                        Period: <span className="text-[rgb(var(--neon-cyan))]">{publication.period}</span>
                      </span>
                      <span className="hidden md:inline">•</span>
                      <span>
                        Supervisor: <span className="text-[rgb(var(--neon-pink))] font-mono">{publication.supervisor}</span>
                      </span>
                    </div>
                  </div>

                  {/* Abstract Section */}
                  {publication.abstract && (
                    <div className="mt-6 pt-6 border-t border-[rgb(var(--neon-purple))] border-opacity-30">
                      <button
                        onClick={() => toggleAbstract(index)}
                        className="flex items-center gap-2 text-sm font-mono text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-purple))] transition-colors mb-3 group/btn"
                      >
                        <motion.span
                          animate={{ rotate: expandedIndex === index ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-lg"
                        >
                          ▶
                        </motion.span>
                        <span className="border-b border-transparent group-hover/btn:border-[rgb(var(--neon-purple))]">
                          {expandedIndex === index ? 'Hide Abstract' : 'Read Abstract'}
                        </span>
                      </button>
                      
                      <AnimatePresence>
                        {expandedIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="bg-[rgb(var(--bg-secondary))] bg-opacity-50 rounded-lg p-4 md:p-6 border border-[rgb(var(--neon-purple))] border-opacity-20">
                              <p className="text-xs uppercase tracking-wider text-[rgb(var(--neon-purple))] mb-3 font-mono">
                                Abstract
                              </p>
                              <p className="text-sm md:text-base text-[rgb(var(--text-secondary))] leading-relaxed text-justify">
                                {publication.abstract}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

