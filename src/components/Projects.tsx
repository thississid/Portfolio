'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: 'RAG-based Automated Support System',
    period: 'March 2025 – July 2025',
    tech: ['n8n', 'OpenAI', 'LangChain', 'Pinecone'],
    description: 'Intelligent customer support system with AI agents for automated issue resolution',
    achievements: [
      'Reduced human intervention by 40% using AI agents',
      'Implemented self-learning knowledge base with vector database',
      'Automated report generation and support ticket classification',
    ],
  },
  {
    title: 'Telecom Customer Churn Prediction',
    period: 'Jan. 2025 – Mar. 2025',
    tech: ['Python', 'Scikit-learn', 'XGBoost', 'EDA'],
    description: 'End-to-end customer churn analysis with machine learning models',
    achievements: [
      'Achieved 81.2% accuracy in identifying potential churn customers',
      'Applied advanced feature engineering and EDA techniques',
      'Evaluated multiple ML models including Random Forest and XGBoost',
    ],
  },
  {
    title: 'Predictive Maintenance Application',
    period: 'June 2024 – July 2024',
    tech: ['Python', 'TensorFlow', 'Flask', 'OpenAI Whisper'],
    description: 'Flask-based predictive maintenance app using deep learning',
    achievements: [
      'Achieved 86.24% RUL prediction accuracy on NASA CMAPSS dataset',
      'Integrated speech recognition and anomaly detection',
      'Delivered RMSE of 44.08 and Silhouette Score of 0.563',
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 neon-text-green">
            {'<FEATURED_PROJECTS />'}
          </h2>
          <div className="h-1 w-24 md:w-32 bg-[rgb(var(--neon-green))] mb-8 md:mb-12 shadow-[0_0_10px_rgb(var(--neon-green))]" />
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-linear-to-r from-[rgb(var(--neon-cyan))] to-[rgb(var(--neon-pink))] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              
              <div className="relative neon-border p-6 bg-[rgb(var(--bg-secondary))] bg-opacity-70 backdrop-blur-sm hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-all duration-500">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <h3 className="text-2xl font-bold text-[rgb(var(--neon-cyan))] mb-2">
                    {project.title}
                  </h3>
                  <span className="text-[rgb(var(--neon-pink))] font-mono text-sm">
                    {project.period}
                  </span>
                </div>

                <p className="text-[rgb(var(--text-secondary))] mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 border border-[rgb(var(--neon-purple))] text-[rgb(var(--neon-purple))] text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="space-y-2">
                  {project.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                      className="flex items-start gap-3 text-[rgb(var(--text-secondary))] text-sm"
                    >
                      <span className="text-[rgb(var(--neon-green))] mt-1">▸</span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Publications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 neon-border p-6 bg-[rgb(var(--bg-secondary))] bg-opacity-50 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold mb-4 neon-text-purple">
            {'> PUBLICATIONS'}
          </h3>
          <div className="border-l-2 border-[rgb(var(--neon-cyan))] pl-4">
            <p className="text-xl text-[rgb(var(--text-primary))] mb-2">
              Enhancing Remaining Useful Life Prediction
            </p>
            <p className="text-[rgb(var(--text-secondary))] mb-2">
              A Comparative Study of Classical Machine Learning and Generative AI
            </p>
            <p className="text-sm text-[rgb(var(--neon-green))] mb-2">
              Springer CCIS Series • ThinkAI&apos;24 Conference
            </p>
            <p className="text-sm text-[rgb(var(--text-secondary))]">
              Supervised by Ravi Katukam (Ravi.k@arthink.ai)
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
