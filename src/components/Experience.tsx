'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'AI and Payments Intern',
    company: 'PiResearch Labs',
    period: 'June 2025 – Present',
    achievements: [
      'Designed and implemented complete database schema for company-wide operations',
      'Built and optimized REST API endpoints for core application workflows',
      'Developed automation scripts for reconciliation and merchant background checks',
    ],
  },
  {
    title: 'Contractor - Agentic AI',
    company: 'Hexagon R&D India',
    period: 'Jan. 2025 – Feb. 2025',
    achievements: [
      'Developed Agentic AI prototype improving issue resolution speed by 25%',
      'Designed AI agents using Azure OpenAI with MagenticOne framework',
      'Reduced resolution time by 40% through autonomous log analysis',
      'Improved system scalability by 20% with REST APIs and Ollama models',
    ],
  },
  {
    title: 'AI Intern',
    company: 'Arthink.ai',
    period: 'June 2024 – July 2024',
    achievements: [
      'Developed regression models achieving 86.24% accuracy on NASA CMAPSS dataset',
      'Engineered full-stack Flask application with ML models and LangChain agents',
      'Fine-tuned GPT-2 using Hugging Face Transformers, improving performance by 30%',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 neon-text-pink">
            {'<WORK_EXPERIENCE />'}
          </h2>
          <div className="h-1 w-24 md:w-32 bg-[rgb(var(--neon-pink))] mb-8 md:mb-12 shadow-[0_0_10px_rgb(var(--neon-pink))]" />
        </motion.div>

        <div className="space-y-8 md:space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="neon-border p-6 md:p-8 bg-[rgb(var(--bg-secondary))] bg-opacity-50 backdrop-blur-sm hover:shadow-[0_0_30px_rgb(var(--neon-cyan))] transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-[rgb(var(--neon-cyan))] mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-xl text-[rgb(var(--neon-purple))]">{exp.company}</p>
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
                    <span className="text-[rgb(var(--neon-pink))] mt-1">▹</span>
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
