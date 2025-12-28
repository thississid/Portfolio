'use client';

import { useState } from 'react';
import Link from 'next/link';

type View = 'dashboard' | 'blog' | 'projects' | 'analytics';

export default function AdminPage() {
  const [activeView, setActiveView] = useState<View>('dashboard');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-[rgb(var(--neon-cyan))] border-opacity-30">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[rgb(var(--neon-cyan))]">
            Admin Panel
          </h1>
          <p className="text-sm text-gray-400 mt-1">Portfolio CMS</p>
        </div>

        <nav className="mt-6">
          <NavItem
            icon="📊"
            label="Dashboard"
            active={activeView === 'dashboard'}
            onClick={() => setActiveView('dashboard')}
          />
          <NavItem
            icon="📝"
            label="Blog Posts"
            active={activeView === 'blog'}
            onClick={() => setActiveView('blog')}
          />
          <NavItem
            icon="🚀"
            label="Projects"
            active={activeView === 'projects'}
            onClick={() => setActiveView('projects')}
          />
          <NavItem
            icon="📈"
            label="Analytics"
            active={activeView === 'analytics'}
            onClick={() => setActiveView('analytics')}
          />
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t border-[rgb(var(--neon-cyan))] border-opacity-30">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-[rgb(var(--neon-cyan))] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-gray-900 border-b border-[rgb(var(--neon-cyan))] border-opacity-30 p-6">
          <h2 className="text-2xl font-bold">
            {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
          </h2>
        </header>

        <div className="p-6">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'blog' && <BlogView />}
          {activeView === 'projects' && <ProjectsView />}
          {activeView === 'analytics' && <AnalyticsView />}
        </div>
      </main>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-6 py-3 transition-all ${
        active
          ? 'bg-[rgb(var(--neon-cyan))] bg-opacity-20 text-[rgb(var(--neon-cyan))] border-l-4 border-[rgb(var(--neon-cyan))]'
          : 'text-gray-400 hover:bg-gray-800 border-l-4 border-transparent'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function DashboardView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Blog Posts"
        value="12"
        change="+2 this month"
        color="cyan"
      />
      <StatCard
        title="Total Projects"
        value="8"
        change="+1 this month"
        color="purple"
      />
      <StatCard
        title="Total Views"
        value="1,234"
        change="+15% this week"
        color="green"
      />
      <StatCard
        title="Contact Messages"
        value="23"
        change="+5 this week"
        color="pink"
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  color,
}: {
  title: string;
  value: string;
  change: string;
  color: 'cyan' | 'purple' | 'green' | 'pink';
}) {
  const colorClasses = {
    cyan: 'border-[rgb(var(--neon-cyan))] text-[rgb(var(--neon-cyan))]',
    purple: 'border-[rgb(var(--neon-purple))] text-[rgb(var(--neon-purple))]',
    green: 'border-[rgb(var(--neon-green))] text-[rgb(var(--neon-green))]',
    pink: 'border-[rgb(var(--neon-pink))] text-[rgb(var(--neon-pink))]',
  };

  return (
    <div
      className={`p-6 bg-transparent border ${colorClasses[color]} border-opacity-30 rounded-lg`}
    >
      <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
      <p className="text-sm text-gray-500 mt-2">{change}</p>
    </div>
  );
}

function BlogView() {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Manage Blog Posts</h3>
        <button
          onClick={() => setShowEditor(true)}
          className="px-4 py-2 bg-[rgb(var(--neon-cyan))] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          + New Post
        </button>
      </div>

      {showEditor ? (
        <BlogEditor onClose={() => setShowEditor(false)} />
      ) : (
        <div className="space-y-4">
          <BlogPostItem
            title="Getting Started with Next.js 14"
            date="2024-01-15"
            status="published"
            views={234}
          />
          <BlogPostItem
            title="Advanced TypeScript Patterns"
            date="2024-01-10"
            status="published"
            views={156}
          />
          <BlogPostItem
            title="AI/ML Best Practices"
            date="2024-01-05"
            status="draft"
            views={0}
          />
        </div>
      )}
    </div>
  );
}

function BlogPostItem({
  title,
  date,
  status,
  views,
}: {
  title: string;
  date: string;
  status: 'published' | 'draft';
  views: number;
}) {
  return (
    <div className="p-4 bg-gray-900 border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg flex items-center justify-between">
      <div>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-sm text-gray-400 mt-1">
          {date} • {views} views
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            status === 'published'
              ? 'bg-green-500 bg-opacity-20 text-green-400'
              : 'bg-yellow-500 bg-opacity-20 text-yellow-400'
          }`}
        >
          {status}
        </span>
        <button className="text-[rgb(var(--neon-cyan))] hover:opacity-75">
          Edit
        </button>
        <button className="text-red-500 hover:opacity-75">Delete</button>
      </div>
    </div>
  );
}

function BlogEditor({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-gray-900 border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">New Blog Post</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
            placeholder="Enter post title..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Slug</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
            placeholder="post-slug"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Excerpt</label>
          <textarea
            rows={3}
            className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none resize-none"
            placeholder="Brief description..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content (MDX)</label>
          <textarea
            rows={12}
            className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none resize-none font-mono text-sm"
            placeholder="# Your markdown content here..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
              placeholder="nextjs, typescript, tutorial"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Read Time</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
              placeholder="5 min read"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-[rgb(var(--neon-cyan))] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Publish
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-transparent border border-gray-600 rounded-lg hover:border-gray-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function ProjectsView() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Manage Projects</h3>
        <button className="px-4 py-2 bg-[rgb(var(--neon-purple))] text-white rounded-lg hover:opacity-90 transition-opacity">
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectCard
          title="AI-Powered Analytics Platform"
          tech={['Python', 'TensorFlow', 'React']}
          status="live"
        />
        <ProjectCard
          title="E-Commerce Dashboard"
          tech={['Next.js', 'TypeScript', 'Tailwind']}
          status="live"
        />
        <ProjectCard
          title="Mobile App Backend"
          tech={['Node.js', 'MongoDB', 'Docker']}
          status="in-progress"
        />
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  tech,
  status,
}: {
  title: string;
  tech: string[];
  status: 'live' | 'in-progress';
}) {
  return (
    <div className="p-4 bg-gray-900 border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-lg">{title}</h4>
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            status === 'live'
              ? 'bg-green-500 bg-opacity-20 text-green-400'
              : 'bg-blue-500 bg-opacity-20 text-blue-400'
          }`}
        >
          {status}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {tech.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-1 bg-[rgb(var(--neon-purple))] bg-opacity-20 rounded"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-3">
        <button className="text-[rgb(var(--neon-purple))] hover:opacity-75 text-sm">
          Edit
        </button>
        <button className="text-red-500 hover:opacity-75 text-sm">Delete</button>
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-gray-900 border border-[rgb(var(--neon-green))] border-opacity-30 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Page Views (Last 7 Days)</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[45, 62, 38, 71, 54, 83, 67].map((value, i) => (
              <div
                key={i}
                className="flex-1 bg-[rgb(var(--neon-green))] bg-opacity-50 rounded-t"
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
        </div>

        <div className="p-6 bg-gray-900 border border-[rgb(var(--neon-pink))] border-opacity-30 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
          <div className="space-y-3">
            <PageStat page="/" views={456} />
            <PageStat page="/blog" views={234} />
            <PageStat page="/projects" views={189} />
            <PageStat page="/contact" views={123} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PageStat({ page, views }: { page: string; views: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400">{page}</span>
      <span className="text-[rgb(var(--neon-pink))] font-semibold">{views} views</span>
    </div>
  );
}
