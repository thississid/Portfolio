'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';
import TechModal, { techData } from './ui/TechModal';

const skillCategories = [
  {
    name: 'Languages',
    skills: ['Python', 'SQL', 'Java', 'C'],
    description: 'Core programming languages for development and data manipulation',
    color: 'moss',
  },
  {
    name: 'AI/ML Tools',
    skills: ['Hugging Face', 'GPT-2', 'Weaviate', 'Pinecone', 'Granger Causality', 'OpenAI Whisper'],
    description: 'Specialized tools and models for AI/ML development and deployment',
    color: 'sakura',
  },
  {
    name: 'Frameworks',
    skills: ['LangChain', 'Transformers', 'Django', 'TensorFlow', 'Flask', 'React'],
    description: 'Development frameworks for building scalable applications',
    color: 'indigo',
  },
  {
    name: 'Cloud & DevOps',
    skills: ['Azure OpenAI', 'Docker', 'REST APIs', 'AWS Bedrock'],
    description: 'Cloud services, containerization, and API development',
    color: 'terracotta',
  },
  {
    name: 'IDEs & Tools',
    skills: ['VS Code', 'PyCharm', 'IntelliJ', 'Eclipse', 'Git'],
    description: 'Development environments and version control',
    color: 'beige',
  },
];

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
    <Section id="skills" centerContent>
      <Container>
        <SectionTitle title="Skills" color="indigo" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <Card
              key={category.name}
              borderColor="beige"
              delay={index * 0.1}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-[rgb(var(--bg-tertiary))]"
            >
              <h3 className="text-xl font-medium mb-2 text-[rgb(var(--text-primary))]">
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
                    className="px-3 py-1.5 border border-[rgb(var(--border))] text-[rgb(var(--text-primary))] text-sm hover:border-[rgb(var(--text-primary))] transition-colors duration-200 font-mono cursor-pointer"
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

