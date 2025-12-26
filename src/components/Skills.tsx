'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';
import TechModal, { techData } from './ui/TechModal';
import ShootingStars from './ui/ShootingStars';

const skillCategories = [
  {
    name: 'Languages',
    skills: ['Python', 'SQL', 'Java', 'C'],
    description: 'Core programming languages for development and data manipulation',
    color: 'cyan',
  },
  {
    name: 'AI/ML Tools',
    skills: ['Hugging Face', 'GPT-2', 'Weaviate', 'Pinecone', 'Granger Causality', 'OpenAI Whisper'],
    description: 'Specialized tools and models for AI/ML development and deployment',
    color: 'pink',
  },
  {
    name: 'Frameworks',
    skills: ['LangChain', 'Transformers', 'Django', 'TensorFlow', 'Flask', 'React'],
    description: 'Development frameworks for building scalable applications',
    color: 'purple',
  },
  {
    name: 'Cloud & DevOps',
    skills: ['Azure OpenAI', 'Docker', 'REST APIs', 'AWS Bedrock'],
    description: 'Cloud services, containerization, and API development',
    color: 'green',
  },
  {
    name: 'IDEs & Tools',
    skills: ['VS Code', 'PyCharm', 'IntelliJ', 'Eclipse', 'Git'],
    description: 'Development environments and version control',
    color: 'ai',
  },
];

const getColorClass = (color: string) => {
  const colors: Record<string, string> = {
    cyan: 'neon-text-cyan',
    pink: 'neon-text-pink',
    purple: 'neon-text-purple',
    green: 'neon-text-green',
    ai: 'neon-text-ai',
  };
  return colors[color] || 'neon-text-cyan';
};

const getBorderClass = (color: string) => {
  const borders: Record<string, string> = {
    cyan: 'border-[rgb(var(--neon-cyan))]',
    pink: 'border-[rgb(var(--neon-pink))]',
    purple: 'border-[rgb(var(--neon-purple))]',
    green: 'border-[rgb(var(--neon-green))]',
    ai: 'border-[rgb(var(--accent-ai))]',
  };
  return borders[color] || 'border-[rgb(var(--neon-cyan))]';
};

export default function Skills() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTechClick = (techName: string) => {
    setSelectedTech(techName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTech(null);
  };

  return (
    <Section id="skills" centerContent showNeuralNetwork>
      <ShootingStars count={3} />
      <Container>
        <SectionTitle title="<SKILLS />" color="purple" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <Card
              key={category.name}
              borderColor={category.color as 'cyan' | 'pink' | 'purple' | 'green' | 'ai'}
              delay={index * 0.1}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className={`border-2 ${getBorderClass(category.color)} bg-opacity-30`}
            >
              <h3 className={`text-xl font-bold mb-2 ${getColorClass(category.color)} font-mono`}>
                {category.name}
              </h3>
              {category.description && (
                <p className="text-sm text-[rgb(var(--text-secondary))] mb-4 opacity-80">
                  {category.description}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    onClick={() => handleTechClick(skill)}
                    className="px-3 py-1.5 border border-[rgb(var(--text-secondary))] text-[rgb(var(--text-primary))] text-sm hover:border-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-cyan))] hover:shadow-[0_0_10px_rgb(var(--neon-cyan))] transition-all duration-300 font-mono cursor-pointer"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
      <TechModal 
        tech={selectedTech ? techData[selectedTech] || null : null}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Section>
  );
}

