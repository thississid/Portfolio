'use client';

import { motion } from 'framer-motion';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';

const experiences = [
  {
    title: 'Associate AI Python Engineer',
    company: 'Techolution',
    period: 'March 2026 – Present',
    focus: 'Enterprise AI governance platform — cost intelligence, root-cause analysis, and cloud automation. Promoted from AI Engineering Intern.',
    achievements: [
      'Built the flagship AI Governance platform’s L4 Entity Intelligence layer, unifying cost, usage, and movement analytics across 11 entity scopes including Firestore, Compute Engine, AlloyDB, Cloud Logging, Pub/Sub, and agent-assistant relationships',
      'Designed movement-detection logic (spike, drop, fast, slow, new, dormant) backed by 3/7/30-day moving averages and working-day-aware historical comparisons to surface the resources that actually need investigation',
      'Engineered a generic multi-source AI root-cause-analysis agent that pulls evidence from AlloyDB, Cloud Logging, and PromQL metrics, and auto-triggers on significant cost movements',
      'Added hallucination-prevention guardrails — schema and column validation, contract checks — and a structured Incident / Root Cause / Next Steps report format with evidence-ranked contributors',
      'Optimized historical data backfills, validating a 5,674-row, 219-call run with zero failures while cutting batch-processing time roughly 13x',
      'Automated daily intelligence refreshes with Cloud Scheduler and a 24h/48h reconciliation window to account for delayed cloud billing data',
      'Shipped supporting platform features: Triage AI alert ingestion and classification, RBAC-backed Smart AI Prompt Policies with audit trails, LLM and cloud cost analytics, and cloud utilization/hibernation automation',
    ],
  },
  {
    title: 'Data Science Intern',
    company: 'PiResearch Labs',
    period: 'June 2025 – Mar. 2026',
    focus: 'Operational data systems, backend APIs, and workflow automation',
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
    focus: 'Agentic root-cause analysis for enterprise database operations',
    achievements: [
      'Conceptualized and developed an Agentic AI prototype with autonomous root cause analysis for databases, improving HxGN NetWorks issue resolution speed by 25% and cutting average resolution time by 40%',
      'Designed AI agents using Azure OpenAI models with MagenticOne to autonomously analyze database and service logs, reducing resolution time by 40%; benchmarked against state-of-the-art Agentic frameworks like AutoGen and CrewAI',
      'Conducted extensive experimentation with REST APIs and Ollama models, improving system scalability by 20% and reducing cloud computing costs compared to generic GPT-based solutions',
    ],
  },
  {
    title: 'AI Intern',
    company: 'Arthink.ai',
    period: 'June 2024 – July 2024',
    focus: 'Predictive ML, anomaly detection, and LLM-assisted monitoring',
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

        <div className="space-y-6 md:space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              borderColor="indigo"
              delay={index * 0.08}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={index === 0 ? 'relative overflow-hidden border-[rgb(var(--neon-cyan))]/70 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(255,255,255,0.92)_34%,rgba(244,114,182,0.09))]' : ''}
            >
              {index === 0 && (
                <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-[rgb(var(--neon-cyan))]/10" />
              )}
              <div className="relative flex flex-col gap-5 md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <div className="mb-3 inline-flex rounded-full border border-[rgb(var(--border))]/70 bg-[rgb(var(--bg-primary))]/65 px-3 py-1 text-xs uppercase tracking-[0.12em] text-[rgb(var(--text-secondary))]">
                    {index === 0 ? 'Current Mission' : `Mission ${String(index + 1).padStart(2, '0')}`}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-[rgb(var(--text-primary))] mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-xl text-[rgb(var(--neon-cyan))]">{exp.company}</p>
                  <p className="mt-3 max-w-2xl text-sm md:text-base text-[rgb(var(--text-secondary))]">
                    {exp.focus}
                  </p>
                </div>
                <span className="w-fit rounded-full border border-[rgb(var(--neon-green))]/35 bg-[rgb(var(--neon-green))]/10 px-3 py-1.5 text-sm text-[rgb(var(--neon-green))]">
                  {exp.period}
                </span>
              </div>
              
              <ul className="relative grid gap-3 md:grid-cols-2 [&>*:last-child:nth-child(odd)]:md:col-span-2">
                {exp.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: Math.min(i * 0.025, 0.1), ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-3 rounded-md border border-[rgb(var(--border))]/55 bg-[rgb(var(--bg-primary))]/70 p-4 text-[rgb(var(--text-secondary))]"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[rgb(var(--neon-cyan))] shadow-[0_0_16px_rgba(34,211,238,0.8)]" />
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
