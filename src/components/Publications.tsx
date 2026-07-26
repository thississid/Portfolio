'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';

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
      <Container>
        <SectionTitle title="Publications" color="indigo" />

        <div className="space-y-8 md:space-y-12">
          {publications.map((publication, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: Math.min(index * 0.06, 0.16), ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--indigo-blue))] to-[rgb(var(--sakura-pink))] opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-500" />
              
              <Card
                borderColor="indigo"
                delay={index * 0.04}
                className="relative bg-opacity-70"
              >
                <div className="border-l-2 border-[rgb(var(--neon-cyan))] pl-6">
                  <h3 className="text-2xl md:text-3xl font-semibold text-[rgb(var(--text-primary))] mb-3">
                    {publication.title}
                  </h3>
                  
                  <p className="text-lg text-[rgb(var(--text-primary))] mb-4">
                    {publication.subtitle}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-[rgb(var(--neon-green))]">
                      {publication.venue}
                    </p>
                    
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-sm text-[rgb(var(--text-secondary))]">
                      <span>
                        Period: <span className="text-[rgb(var(--neon-pink))]">{publication.period}</span>
                      </span>
                      <span className="hidden md:inline">•</span>
                      <span>
                        Supervisor: <span className="text-[rgb(var(--neon-cyan))]">{publication.supervisor}</span>
                      </span>
                    </div>
                  </div>

                  {/* Abstract Section */}
                  {publication.abstract && (
                    <div className="mt-6 pt-6 border-t border-[rgb(var(--border))]/60">
                      <button
                        onClick={() => toggleAbstract(index)}
                        className="flex items-center gap-2 text-sm text-[rgb(var(--neon-pink))] hover:text-[rgb(var(--neon-cyan))] transition-colors mb-3 group/btn"
                      >
                        <motion.span
                          animate={{ rotate: expandedIndex === index ? 90 : 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="text-lg"
                        >
                          ▶
                        </motion.span>
                        <span className="border-b border-transparent group-hover/btn:border-[rgb(var(--neon-cyan))]">
                          {expandedIndex === index ? 'Hide Abstract' : 'Read Abstract'}
                        </span>
                      </button>
                      
                      <AnimatePresence>
                        {expandedIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))]/45 p-4 md:p-6">
                              <p className="text-xs uppercase tracking-wider text-[rgb(var(--neon-cyan))] mb-3">
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
