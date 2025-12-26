'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface TechInfo {
  name: string;
  description: string;
  category: string;
  useCases?: string[];
}

interface TechModalProps {
  tech: TechInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export const techData: Record<string, TechInfo> = {
  'Python': {
    name: 'Python',
    description: 'A high-level, interpreted programming language known for its simplicity and readability. Widely used in web development, data science, AI/ML, and automation.',
    category: 'Programming Language',
    useCases: ['Web Development', 'Data Science', 'AI/ML', 'Automation', 'Backend Development']
  },
  'SQL': {
    name: 'SQL',
    description: 'Structured Query Language for managing and manipulating relational databases. Essential for data retrieval, storage, and database management.',
    category: 'Database Language',
    useCases: ['Database Management', 'Data Analysis', 'Backend Development', 'Data Warehousing']
  },
  'Java': {
    name: 'Java',
    description: 'Object-oriented programming language designed for cross-platform compatibility. Used in enterprise applications, Android development, and large-scale systems.',
    category: 'Programming Language',
    useCases: ['Enterprise Applications', 'Android Development', 'Web Applications', 'Big Data']
  },
  'C': {
    name: 'C',
    description: 'Low-level systems programming language. Foundation for many modern languages and used in system programming, embedded systems, and performance-critical applications.',
    category: 'Systems Programming',
    useCases: ['System Programming', 'Embedded Systems', 'Operating Systems', 'Performance-Critical Apps']
  },
  'Hugging Face': {
    name: 'Hugging Face',
    description: 'Open-source platform providing pre-trained models and tools for natural language processing, computer vision, and audio tasks.',
    category: 'AI/ML Framework',
    useCases: ['NLP', 'Computer Vision', 'Model Deployment', 'Transfer Learning']
  },
  'GPT-2': {
    name: 'GPT-2',
    description: 'Generative Pre-trained Transformer 2, a large language model by OpenAI. Used for text generation, completion, and various NLP tasks.',
    category: 'AI Model',
    useCases: ['Text Generation', 'Language Understanding', 'Content Creation', 'NLP Tasks']
  },
  'Weaviate': {
    name: 'Weaviate',
    description: 'Open-source vector database designed for machine learning applications. Enables semantic search and similarity-based queries.',
    category: 'Vector Database',
    useCases: ['Semantic Search', 'RAG Systems', 'Similarity Search', 'ML Applications']
  },
  'Pinecone': {
    name: 'Pinecone',
    description: 'Managed vector database service for building AI applications. Optimized for similarity search and machine learning workloads.',
    category: 'Vector Database',
    useCases: ['Vector Search', 'RAG Systems', 'Recommendation Systems', 'AI Applications']
  },
  'Granger Causality': {
    name: 'Granger Causality',
    description: 'Statistical method for determining whether one time series is useful in forecasting another. Used in econometrics and time series analysis.',
    category: 'Statistical Method',
    useCases: ['Time Series Analysis', 'Anomaly Detection', 'Causal Inference', 'Forecasting']
  },
  'OpenAI Whisper': {
    name: 'OpenAI Whisper',
    description: 'Automatic speech recognition (ASR) system trained on diverse audio data. Converts speech to text with high accuracy across multiple languages.',
    category: 'AI Model',
    useCases: ['Speech Recognition', 'Transcription', 'Multilingual Support', 'Audio Processing']
  },
  'LangChain': {
    name: 'LangChain',
    description: 'Framework for developing applications powered by language models. Simplifies building LLM applications with chains, agents, and memory.',
    category: 'AI Framework',
    useCases: ['LLM Applications', 'RAG Systems', 'AI Agents', 'Document Processing']
  },
  'Transformers': {
    name: 'Transformers',
    description: 'Hugging Face library providing state-of-the-art NLP models. Includes pre-trained models for various tasks like classification, generation, and translation.',
    category: 'ML Library',
    useCases: ['NLP Tasks', 'Model Fine-tuning', 'Text Classification', 'Language Models']
  },
  'Django': {
    name: 'Django',
    description: 'High-level Python web framework that encourages rapid development and clean, pragmatic design. Includes ORM, admin panel, and security features.',
    category: 'Web Framework',
    useCases: ['Web Applications', 'REST APIs', 'Content Management', 'Rapid Prototyping']
  },
  'TensorFlow': {
    name: 'TensorFlow',
    description: 'Open-source machine learning framework by Google. Used for building and training neural networks and deep learning models.',
    category: 'ML Framework',
    useCases: ['Deep Learning', 'Neural Networks', 'Model Training', 'Production ML']
  },
  'Flask': {
    name: 'Flask',
    description: 'Lightweight Python web framework. Provides flexibility and simplicity for building web applications and APIs.',
    category: 'Web Framework',
    useCases: ['Web APIs', 'Microservices', 'Prototyping', 'Small to Medium Apps']
  },
  'React': {
    name: 'React',
    description: 'JavaScript library for building user interfaces. Component-based architecture for creating interactive and dynamic web applications.',
    category: 'Frontend Framework',
    useCases: ['User Interfaces', 'Single Page Apps', 'Component Libraries', 'Interactive Web Apps']
  },
  'Azure OpenAI': {
    name: 'Azure OpenAI',
    description: 'Microsoft Azure service providing access to OpenAI models with enterprise-grade security and compliance features.',
    category: 'Cloud AI Service',
    useCases: ['Enterprise AI', 'LLM Applications', 'Secure AI Deployment', 'Scalable AI']
  },
  'Docker': {
    name: 'Docker',
    description: 'Platform for containerizing applications. Enables consistent deployment across different environments using containers.',
    category: 'DevOps Tool',
    useCases: ['Containerization', 'Application Deployment', 'Environment Consistency', 'Microservices']
  },
  'REST APIs': {
    name: 'REST APIs',
    description: 'Architectural style for designing networked applications. Uses HTTP methods for communication between client and server.',
    category: 'API Architecture',
    useCases: ['Web Services', 'API Development', 'Microservices', 'Integration']
  },
  'AWS Bedrock': {
    name: 'AWS Bedrock',
    description: 'Amazon Web Services platform for building and scaling generative AI applications with foundation models.',
    category: 'Cloud AI Service',
    useCases: ['Generative AI', 'LLM Applications', 'AI Model Access', 'Scalable AI']
  },
  'VS Code': {
    name: 'VS Code',
    description: 'Lightweight, cross-platform code editor by Microsoft. Extensible with plugins and integrated terminal.',
    category: 'IDE',
    useCases: ['Code Editing', 'Debugging', 'Version Control', 'Extension Development']
  },
  'PyCharm': {
    name: 'PyCharm',
    description: 'Python IDE by JetBrains. Provides intelligent code completion, debugging, and testing tools for Python development.',
    category: 'IDE',
    useCases: ['Python Development', 'Django Development', 'Data Science', 'Web Development']
  },
  'IntelliJ': {
    name: 'IntelliJ IDEA',
    description: 'Java IDE by JetBrains with advanced code analysis, refactoring tools, and support for multiple languages and frameworks.',
    category: 'IDE',
    useCases: ['Java Development', 'Enterprise Applications', 'Spring Framework', 'Multi-language Support']
  },
  'Eclipse': {
    name: 'Eclipse',
    description: 'Open-source IDE primarily for Java development. Extensible platform with plugins for various programming languages.',
    category: 'IDE',
    useCases: ['Java Development', 'Plugin Development', 'Enterprise Tools', 'Multi-language Support']
  },
  'Git': {
    name: 'Git',
    description: 'Distributed version control system for tracking changes in source code. Essential for collaborative software development.',
    category: 'Version Control',
    useCases: ['Version Control', 'Collaboration', 'Code Management', 'Deployment']
  },
  'n8n': {
    name: 'n8n',
    description: 'Open-source workflow automation tool. Allows you to connect different services and automate tasks without coding.',
    category: 'Automation Tool',
    useCases: ['Workflow Automation', 'API Integration', 'Data Processing', 'Task Automation']
  },
  'OpenAI': {
    name: 'OpenAI',
    description: 'AI research company providing advanced language models and AI APIs. Powers applications with natural language understanding and generation.',
    category: 'AI Service',
    useCases: ['LLM Applications', 'Text Generation', 'Language Understanding', 'AI Integration']
  },
  'Scikit-learn': {
    name: 'Scikit-learn',
    description: 'Machine learning library for Python. Provides simple and efficient tools for data mining and data analysis.',
    category: 'ML Library',
    useCases: ['Machine Learning', 'Data Analysis', 'Model Training', 'Predictive Analytics']
  },
  'EDA': {
    name: 'Exploratory Data Analysis (EDA)',
    description: 'Approach to analyzing data sets to summarize their main characteristics, often with visual methods.',
    category: 'Data Analysis',
    useCases: ['Data Exploration', 'Pattern Discovery', 'Statistical Analysis', 'Data Visualization']
  }
};

export default function TechModal({ tech, isOpen, onClose }: TechModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!tech) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-[10000]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[10001] flex items-center justify-center p-4 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[rgb(var(--bg-secondary))] bg-opacity-90 backdrop-blur-lg border-2 border-[rgb(var(--neon-cyan))] border-opacity-50 rounded-lg shadow-[0_0_30px_rgba(0,200,220,0.3)] max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-[rgb(var(--neon-cyan))] mb-2 font-mono">
                      {tech.name}
                    </h2>
                    <p className="text-sm text-[rgb(var(--text-secondary))] font-mono">
                      {tech.category}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--neon-pink))] transition-colors text-2xl font-mono"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                {/* Description */}
                <p className="text-[rgb(var(--text-primary))] mb-6 leading-relaxed">
                  {tech.description}
                </p>

                {/* Use Cases */}
                {tech.useCases && tech.useCases.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-[rgb(var(--neon-green))] mb-3 font-mono">
                      Common Use Cases:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tech.useCases.map((useCase, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-[rgb(var(--bg-primary))] border border-[rgb(var(--neon-purple))] border-opacity-50 text-[rgb(var(--text-primary))] text-sm font-mono rounded"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

