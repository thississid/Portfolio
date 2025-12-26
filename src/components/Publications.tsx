'use client';

import { motion } from 'framer-motion';
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
  },
];

export default function Publications() {
  return (
    <Section id="publications" centerContent>
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
              <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--neon-purple))] to-[rgb(var(--neon-pink))] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              
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
                  
                  <div className="space-y-2">
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
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

