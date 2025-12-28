'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';
import ShootingStars from './ui/ShootingStars';
import TechModal, { techData } from './ui/TechModal';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: string;
  githubUrl?: string;
  liveUrl?: string;
}

export default function Projects() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        // Add timestamp to prevent caching
        const res = await fetch(`/api/admin/projects?t=${Date.now()}`, { 
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          }
        });
        if (res.ok) {
          const data = await res.json();
          console.log('Raw data from API:', data);
          // Only show live projects on frontend
          const liveProjects = data.filter((p: Project) => p.status === 'live');
          console.log('Filtered live projects:', liveProjects);
          console.log('Number of live projects:', liveProjects.length);
          setProjects(liveProjects);
        } else {
          console.error('Failed to fetch projects, status:', res.status);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const handleTechClick = (techName: string) => {
    setSelectedTech(techName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTech(null);
  };

  if (loading) {
    return (
      <Section id="projects" centerContent>
        <Container>
          <SectionTitle title="<PROJECTS />" color="green" />
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--neon-green))] mx-auto"></div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="projects" centerContent>
      <ShootingStars count={3} />
      <Container>
        <SectionTitle title="<PROJECTS />" color="green" />

        <div className="space-y-8 md:space-y-12">
          {projects.length === 0 ? (
            <div className="text-center py-12 text-[rgb(var(--text-secondary))]">
              <p>No projects to display yet.</p>
            </div>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--neon-cyan))] to-[rgb(var(--neon-pink))] opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-500" />
                
                <Card
                  borderColor="cyan"
                  delay={index * 0.2}
                  className="relative bg-opacity-70 hover:shadow-[0_0_40px_rgba(0,255,255,0.4)]"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <h3 className="text-2xl font-bold text-[rgb(var(--neon-cyan))] mb-2 font-mono">
                      {project.title}
                    </h3>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[rgb(var(--neon-pink))] hover:text-[rgb(var(--neon-cyan))] transition-colors font-mono text-sm"
                      >
                        View on GitHub →
                      </a>
                    )}
                  </div>

                  <p className="text-[rgb(var(--text-secondary))] mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech?.map((tech, i) => (
                      <span
                        key={i}
                        onClick={() => handleTechClick(tech)}
                        className="px-3 py-1 border border-[rgb(var(--neon-purple))] text-[rgb(var(--neon-purple))] text-sm font-mono hover:shadow-[0_0_10px_rgb(var(--neon-purple))] transition-all duration-300 cursor-pointer"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.liveUrl && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[rgb(var(--neon-green))] hover:text-[rgb(var(--neon-cyan))] transition-colors font-mono text-sm"
                      >
                        <span>Live Demo</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))
          )}
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

