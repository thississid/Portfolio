'use client';

import { motion } from 'framer-motion';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';

const experiences = [
  {
    title: 'AI and Python Intern',
    company: 'Techolution',
    period: 'March 2026 – Present',
    achievements: [
      'Built and validated backend workflows for an enterprise AI governance service, covering alert ingestion, AI based classification, PDF artifact generation, and API integration.',
      'Improved an access controlled policy management service by validating RBAC permissions, policy lifecycle flows, and audit change tracking.',
      'Implemented analytics cost metrics by integrating LLM usage data with cloud billing export data to calculate LLM cost, cloud cost, and total cost.',
      'Enhanced alert classification accuracy by mapping real cloud infrastructure alerts to governance risk categories such as unused resources, stalled queues, external access, destructive queries, and high memory usage.',
      'Contributed to dashboard improvements by structuring KPI cards, cost insights, risk areas, and actionable governance summaries for better decision making.',
    ],
  },
  {
    title: 'Data Science Intern',
    company: 'PiResearch Labs',
    period: 'June 2025 – Mar. 2026',
    achievements: [
      'Designed and implemented the database schema that supported company-wide operations with a focus on scalability and reliability',
      'Built and optimized REST API endpoints to support core application workflows and improve system performance',
      'Automated reconciliation and merchant background-check workflows to reduce manual effort and improve operational efficiency',
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
      <Container>
        <SectionTitle title="Experience" color="terracotta" />

        <div className="space-y-8 md:space-y-12">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              borderColor="indigo"
              delay={index * 0.2}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className=""
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <h3 className="text-2xl font-light text-[rgb(var(--indigo-blue))] mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-xl text-[rgb(var(--terracotta))]">{exp.company}</p>
                </div>
                <span className="text-[rgb(var(--moss-green))] mt-2 md:mt-0">
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
                    <span className="text-[rgb(var(--sakura-pink))] mt-1">▹</span>
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

