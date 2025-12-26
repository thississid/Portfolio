'use client';

import { motion } from 'framer-motion';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';

const projects = [
  {
    title: 'RAG-based Automated Support System',
    period: 'March 2025 – July 2025',
    tech: ['n8n', 'OpenAI', 'LangChain'],
    description: 'Intelligent customer support system using n8n for workflow automation and Agentic AI agents for diagnosing and resolving user queries',
    achievements: [
      'Built an intelligent customer support system enabling scalable issue triaging with minimal human intervention',
      'Integrated OpenAI-powered AI agents to analyze customer issues, retrieve past solutions, and automate resolution, reducing human intervention by 40%',
      'Implemented a self-learning knowledge base with a vector database Pinecone, improving response accuracy over time',
      'Designed proactive issue detection workflows that monitor system logs and trigger preventive actions',
      'Automated report generation and support ticket classification, streamlining support workflows for faster resolution',
    ],
  },
  {
    title: 'Telecom Customer Churn Prediction',
    period: 'Jan. 2025 – Mar. 2025',
    tech: ['Python', 'Scikit-learn', 'EDA'],
    description: 'End-to-end customer churn analysis using a telecom dataset with feature engineering and exploratory data analysis',
    achievements: [
      'Conducted end-to-end customer churn analysis applying feature engineering and exploratory data analysis (EDA) to uncover churn patterns',
      'Built and evaluated multiple machine learning models including Logistic Regression, Random Forest, and XGBoost',
      'Achieved 81.2% accuracy in identifying potential churn customers',
    ],
  },
  {
    title: 'Predictive Maintenance Application',
    period: 'June 2024 – July 2024',
    tech: ['Python', 'TensorFlow', 'Flask'],
    description: 'Flask-based predictive maintenance app utilizing deep learning models for industrial time-series datasets',
    achievements: [
      'Designed and deployed a Flask-based predictive maintenance app achieving 86.24% RUL prediction accuracy on industrial time-series datasets',
      'Solved RUL prediction, clustering, speech recognition (OpenAI Whisper API), and anomaly detection (Granger Causality)',
      'Achieved an RMSE of 44.08 and a Silhouette Score of 0.563',
    ],
  },
];

export default function Projects() {
  return (
    <Section id="projects" centerContent>
      <Container>
        <SectionTitle title="<PROJECTS />" color="green" />

        <div className="space-y-8 md:space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--neon-cyan))] to-[rgb(var(--neon-pink))] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              
              <Card
                borderColor="cyan"
                delay={index * 0.2}
                className="relative bg-opacity-70 hover:shadow-[0_0_40px_rgba(0,255,255,0.4)]"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <h3 className="text-2xl font-bold text-[rgb(var(--neon-cyan))] mb-2 font-mono">
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
                      className="px-3 py-1 border border-[rgb(var(--neon-purple))] text-[rgb(var(--neon-purple))] text-sm font-mono"
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
                      <span className="text-[rgb(var(--neon-green))] mt-1 font-mono">▸</span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Publications Section */}
        <Card borderColor="cyan" delay={0.6} className="mt-16">
          <h3 className="text-2xl font-bold mb-4 neon-text-purple font-mono">
            {'> PUBLICATIONS'}
          </h3>
          <div className="border-l-2 border-[rgb(var(--neon-cyan))] pl-4">
            <p className="text-xl text-[rgb(var(--text-primary))] mb-2 font-mono">
              Enhancing Remaining Useful Life Prediction
            </p>
            <p className="text-[rgb(var(--text-secondary))] mb-2">
              A Comparative Study of Classical Machine Learning and Generative AI
            </p>
            <p className="text-sm text-[rgb(var(--neon-green))] mb-2 font-mono">
              Springer CCIS Series • ThinkAI&apos;24 Conference
            </p>
            <p className="text-sm text-[rgb(var(--text-secondary))]">
              Worked under the supervision of Ravi Katukam (Ravi.k@arthink.ai) • June 2024 – Dec. 2024
            </p>
          </div>
        </Card>
      </Container>
    </Section>
  );
}

