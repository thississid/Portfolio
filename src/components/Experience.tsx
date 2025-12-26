'use client';

import { motion } from 'framer-motion';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';
import ShootingStars from './ui/ShootingStars';

const experiences = [
  {
    title: 'Data Science Intern',
    company: 'PiResearch Labs',
    period: 'June 2025 – Present',
    achievements: [
      'Designed and implemented the complete database schema serving as the backbone for company-wide operations, ensuring scalability, reliability, and compliance with industry standards',
      'Built and optimized REST API endpoints to support core application workflows and improve system performance',
      'Developed scripts and workflows to automate reconciliation tasks, automatic merchant background check reducing manual effort and increasing operational efficiency',
    ],
  },
  {
    title: 'Contractor - Agentic AI',
    company: 'Hexagon R&D India',
    period: 'Jan. 2025 – Feb. 2025',
    achievements: [
      'Conceptualized and developed an Agentic AI prototype with autonomous root cause analysis for databases, improving HxGN NetWorks issue resolution speed by 25% and cutting average resolution time by 40%',
      'Designed AI agents using Azure OpenAI models with MagenticOne to autonomously analyze database and service logs, reducing resolution time by 40%; benchmarked against state-of-the-art Agentic frameworks like AutoGen, and CrewAI',
      'Conducted extensive experimentation with REST APIs and Ollama models, improving system scalability by 20% and reducing cloud computing costs compared to generic GPT-based solutions',
    ],
  },
  {
    title: 'AI Intern',
    company: 'Arthink.ai',
    period: 'June 2024 – July 2024',
    achievements: [
      'Developed and deployed regression models on NASA CMAPSS dataset for predicting engine Remaining Useful Life (RUL), achieving 86.24% accuracy using TensorFlow-based architectures',
      'Engineered a full-stack Flask application integrating predictive ML models, clustering techniques, Granger Causality for anomaly detection, and Langchain-based LLM agents, resulting in a production-ready AI monitoring tool',
      'Fine-tuned GPT-2 using Hugging Face Transformers and LoRA on domain-specific text data, boosting downstream NLP task performance by 30% compared to baseline pre-trained models',
    ],
  },
];

export default function Experience() {
  return (
    <Section id="experience" centerContent>
      <ShootingStars count={3} />
      <Container>
        <SectionTitle title="<EXPERIENCE />" color="pink" />

        <div className="space-y-8 md:space-y-12">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              borderColor="cyan"
              delay={index * 0.2}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="hover:shadow-[0_0_30px_rgb(var(--neon-cyan))]"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-[rgb(var(--neon-cyan))] mb-2 font-mono">
                    {exp.title}
                  </h3>
                  <p className="text-xl text-[rgb(var(--neon-purple))] font-mono">{exp.company}</p>
                </div>
                <span className="text-[rgb(var(--neon-green))] font-mono mt-2 md:mt-0">
                  {exp.period}
                </span>
              </div>
              
              <ul className="space-y-3">
                {exp.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + i * 0.1 }}
                    className="flex items-start gap-3 text-[rgb(var(--text-secondary))]"
                  >
                    <span className="text-[rgb(var(--neon-pink))] mt-1 font-mono">▹</span>
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

