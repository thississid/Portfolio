'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';
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
          <SectionTitle title="Projects" color="moss" />
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--neon-cyan))] mx-auto"></div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="projects" centerContent>
      <Container>
        <SectionTitle title="Projects" color="moss" />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.length === 0 ? (
            <div className="text-center py-12 text-[rgb(var(--text-secondary))]">
              <p>No projects to display yet.</p>
            </div>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: Math.min(index * 0.06, 0.18), ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-full"
              >
                <Card
                  borderColor="moss"
                  delay={index * 0.04}
                  className="relative h-full overflow-hidden bg-opacity-80"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[rgb(var(--neon-cyan))]/10 blur-2xl transition-opacity group-hover:opacity-100" />
                  <div className="relative mb-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-[rgb(var(--neon-green))]">
                        Live Build / {String(index + 1).padStart(2, '0')}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-semibold text-[rgb(var(--text-primary))] mb-2">
                        {project.title}
                      </h3>
                    </div>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-md border border-[rgb(var(--border))] px-3 py-2 text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-cyan))] transition-colors text-sm"
                      >
                        GitHub
                      </a>
                    )}
                  </div>

                  <p className="relative text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="relative flex flex-wrap gap-2 mb-4">
                    {project.tech?.map((tech, i) => (
                      <span
                        key={i}
                        onClick={() => handleTechClick(tech)}
                        className="px-3 py-1 border border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))]/75 text-[rgb(var(--text-secondary))] text-sm hover:border-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-cyan))] transition-all duration-300 cursor-pointer rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.liveUrl && (
                    <div className="relative mt-5 pt-5 border-t border-[rgb(var(--border))]/60">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-[rgb(var(--neon-cyan))] px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-[rgb(var(--neon-green))] transition-colors"
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
