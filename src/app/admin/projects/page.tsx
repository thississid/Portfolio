'use client';

import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: 'live' | 'in-progress' | 'archived';
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

// Fetch projects from API
async function fetchProjects(): Promise<Project[]> {
  const res = await fetch('/api/admin/projects', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [showEditor, setShowEditor] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'live' | 'in-progress' | 'archived'>('all');

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((project) => 
    filterStatus === 'all' || project.status === filterStatus
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => {
            setEditingProject(null);
            setShowEditor(true);
          }}
          className="px-6 py-3 bg-[rgb(var(--neon-purple))] text-white rounded-lg hover:shadow-[0_0_20px_rgba(var(--neon-purple),0.4)] transition-all flex items-center gap-2"
        >
          <span className="text-xl">➕</span>
          <span>New Project</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg p-4">
        <div className="flex gap-2">
          <FilterButton
            active={filterStatus === 'all'}
            onClick={() => setFilterStatus('all')}
            label="All Projects"
            count={projects.length}
          />
          <FilterButton
            active={filterStatus === 'live'}
            onClick={() => setFilterStatus('live')}
            label="Live"
            count={projects.filter((p) => p.status === 'live').length}
          />
          <FilterButton
            active={filterStatus === 'in-progress'}
            onClick={() => setFilterStatus('in-progress')}
            label="In Progress"
            count={projects.filter((p) => p.status === 'in-progress').length}
          />
          <FilterButton
            active={filterStatus === 'archived'}
            onClick={() => setFilterStatus('archived')}
            label="Archived"
            count={projects.filter((p) => p.status === 'archived').length}
          />
        </div>
      </div>

      {/* Projects Grid */}
      {showEditor ? (
        <ProjectEditor
          project={editingProject}
          onClose={() => {
            setShowEditor(false);
            setEditingProject(null);
          }}
          onSave={(savedProject) => {
            if (editingProject) {
              // Update existing project
              setProjects(projects.map(p => p.id === savedProject.id ? savedProject : p));
            } else {
              // Add new project
              setProjects([savedProject, ...projects]);
            }
            setShowEditor(false);
            setEditingProject(null);
          }}
        />
      ) : loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--neon-purple))] mx-auto mb-4"></div>
            <p className="text-gray-400">Loading projects...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-gray-400">
              <p className="text-xl mb-2">No projects found</p>
              <p className="text-sm">Create your first project to get started</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={(id) => setProjects(projects.filter(p => p.id !== id))}
                onEdit={(project) => {
                  setEditingProject(project);
                  setShowEditor(true);
                }}
              />
            ))
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-900 border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg">
          <p className="text-sm text-gray-400">Total Projects</p>
          <p className="text-2xl font-bold text-[rgb(var(--neon-purple))]">{projects.length}</p>
        </div>
        <div className="p-4 bg-gray-900 border border-[rgb(var(--neon-green))] border-opacity-30 rounded-lg">
          <p className="text-sm text-gray-400">Live Projects</p>
          <p className="text-2xl font-bold text-[rgb(var(--neon-green))]">
            {projects.filter((p) => p.status === 'live').length}
          </p>
        </div>
        <div className="p-4 bg-gray-900 border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg">
          <p className="text-sm text-gray-400">In Progress</p>
          <p className="text-2xl font-bold text-[rgb(var(--neon-cyan))]">
            {projects.filter((p) => p.status === 'in-progress').length}
          </p>
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-all ${
        active
          ? 'bg-[rgb(var(--neon-purple))] text-white hover:shadow-[0_0_15px_rgba(var(--neon-purple),0.4)]'
          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
      }`}
    >
      {label} ({count})
    </button>
  );
}

function ProjectCard({ project, onDelete, onEdit }: { project: Project; onDelete: (id: string) => void; onEdit: (project: Project) => void }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return;

    setDeleting(true);
    try {
      const response = await fetch('/api/admin/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: project.id }),
      });

      if (response.ok) {
        onDelete(project.id);
      } else {
        alert('Failed to delete project');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting project');
    } finally {
      setDeleting(false);
    }
  };

  const statusColors = {
    live: 'bg-green-500 bg-opacity-20 text-green-400',
    'in-progress': 'bg-blue-500 bg-opacity-20 text-blue-400',
    archived: 'bg-gray-500 bg-opacity-20 text-gray-400',
  };

  return (
    <div className="p-6 bg-gray-900 border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg hover:border-opacity-60 transition-all group relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[rgb(var(--neon-purple))] opacity-0 group-hover:opacity-5 transition-opacity" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold group-hover:text-[rgb(var(--neon-purple))] transition-colors">
            {project.title}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs ${statusColors[project.status]}`}>
            {project.status === 'in-progress' ? 'In Progress' : project.status}
          </span>
        </div>

        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech?.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 border border-[rgb(var(--neon-purple))] border-opacity-30 text-[rgb(var(--neon-purple))] rounded hover:bg-[rgb(var(--neon-purple))] hover:bg-opacity-20 hover:border-opacity-60 hover:shadow-[0_0_8px_rgba(var(--neon-purple),0.3)] transition-all cursor-pointer"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[rgb(var(--neon-purple))] transition-colors"
                title="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[rgb(var(--neon-purple))] transition-colors"
                title="Live Demo"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => onEdit(project)}
              className="px-3 py-1 text-[rgb(var(--neon-purple))] border border-[rgb(var(--neon-purple))] border-opacity-30 rounded hover:border-opacity-60 transition-all"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-3 py-1 text-red-500 border border-red-500 border-opacity-30 rounded hover:border-opacity-60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectEditor({ project, onClose, onSave }: { project: Project | null; onClose: () => void; onSave: (project: Project) => void }) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    tech: project?.tech?.join(', ') || '',
    status: (project?.status || 'in-progress') as 'in-progress' | 'live' | 'archived',
    githubUrl: project?.githubUrl || '',
    liveUrl: project?.liveUrl || '',
  });
  const [saving, setSaving] = useState(false);

  const isEditMode = !!project;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert('Please fill in required fields');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...(isEditMode && { id: project.id }),
        title: formData.title,
        description: formData.description,
        tech: formData.tech.split(',').map(t => t.trim()).filter(Boolean),
        status: formData.status,
        githubUrl: formData.githubUrl || undefined,
        liveUrl: formData.liveUrl || undefined,
      };

      const response = await fetch('/api/admin/projects', {
        method: isEditMode ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        onSave(result.project || result);
        onClose();
      } else {
        alert(`Failed to ${isEditMode ? 'update' : 'create'} project`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{isEditMode ? 'Edit Project' : 'Create New Project'}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors text-2xl"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Project Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
            placeholder="Enter project title..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none resize-none"
            placeholder="Describe your project..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tech}
              onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'in-progress' | 'live' | 'archived' })}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
            >
              <option value="in-progress" className="bg-gray-800">In Progress</option>
              <option value="live" className="bg-gray-800">Live</option>
              <option value="archived" className="bg-gray-800">Archived</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">GitHub URL</label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
              placeholder="https://github.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Live URL</label>
            <input
              type="url"
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-[rgb(var(--neon-purple))] text-white rounded-lg hover:shadow-[0_0_20px_rgba(var(--neon-purple),0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : (isEditMode ? 'Update Project' : 'Create Project')}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-8 py-3 bg-transparent border border-gray-600 rounded-lg hover:border-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
