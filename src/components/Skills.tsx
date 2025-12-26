'use client';

import { motion } from 'framer-motion';

const skillCategories = [
  {
    name: 'Languages',
    skills: ['Python', 'SQL', 'Java', 'TypeScript', 'C'],
    color: 'cyan',
  },
  {
    name: 'AI/ML Tools',
    skills: ['Hugging Face', 'GPT-2', 'Weaviate', 'Pinecone', 'OpenAI Whisper', 'TensorFlow'],
    color: 'pink',
  },
  {
    name: 'Frameworks',
    skills: ['LangChain', 'Transformers', 'Django', 'Flask', 'React', 'Next.js'],
    color: 'purple',
  },
  {
    name: 'Cloud & DevOps',
    skills: ['Azure OpenAI', 'AWS Bedrock', 'Docker', 'REST APIs', 'Git'],
    color: 'green',
  },
];

const certifications = [
  'AWS Certified AI Practitioner (2025)',
  'Microsoft Certified: Azure AI Fundamentals (2025)',
  'Azure Fundamentals (2025)',
  'Oracle Cloud Infrastructure Foundations (2024)',
  'Certified Advanced Automation Professional (2024)',
];

export default function Skills() {
  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      cyan: 'neon-text-cyan',
      pink: 'neon-text-pink',
      purple: 'neon-text-purple',
      green: 'text-[rgb(var(--neon-green))]',
    };
    return colors[color] || 'neon-text-cyan';
  };

  const getBorderClass = (color: string) => {
    const borders: Record<string, string> = {
      cyan: 'border-[rgb(var(--neon-cyan))]',
      pink: 'border-[rgb(var(--neon-pink))]',
      purple: 'border-[rgb(var(--neon-purple))]',
      green: 'border-[rgb(var(--neon-green))]',
    };
    return borders[color] || 'border-[rgb(var(--neon-cyan))]';
  };

  return (
    <section id="skills" className="min-h-screen py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 neon-text-purple">
            {'<SKILLS_MATRIX />'}
          </h2>
          <div className="h-1 w-24 md:w-32 bg-[rgb(var(--neon-purple))] mb-8 md:mb-12 shadow-[0_0_10px_rgb(var(--neon-purple))]" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 md:p-8 border-2 ${getBorderClass(category.color)} bg-[rgb(var(--bg-secondary))] bg-opacity-30 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300`}
            >
              <h3 className={`text-2xl font-bold mb-6 ${getColorClass(category.color)}`}>
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    className="px-3 py-1 border border-[rgb(var(--text-secondary))] text-[rgb(var(--text-primary))] text-sm hover:border-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-cyan))] transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="neon-border p-6 md:p-8 bg-[rgb(var(--bg-secondary))] bg-opacity-50 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold mb-6 neon-text-green">
            {'> CERTIFICATIONS'}
          </h3>
          <ul className="space-y-4">
            {certifications.map((cert, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 text-[rgb(var(--text-secondary))]"
              >
                <span className="text-[rgb(var(--neon-green))]">✓</span>
                <span>{cert}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
