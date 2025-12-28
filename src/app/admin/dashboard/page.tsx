'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
  blogPosts: { total: number; change: string };
  projects: { total: number; change: string };
  views: { total: number; change: string };
  messages: { total: number; change: string };
}

interface Activity {
  id: number;
  type: 'blog' | 'message' | 'view' | 'project';
  message: string;
  time: string;
}

// Simulated API calls - replace with actual endpoints
async function fetchDashboardStats(): Promise<Stats> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    blogPosts: { total: 3, change: '+1 this month' },
    projects: { total: 8, change: '+2 this month' },
    views: { total: 1234, change: '+15% this week' },
    messages: { total: 23, change: '+5 this week' },
  };
}

async function fetchRecentActivity(): Promise<Activity[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 1, type: 'blog', message: 'New blog post published: "RUL Prediction"', time: '2 hours ago' },
    { id: 2, type: 'message', message: 'New contact message received', time: '5 hours ago' },
    { id: 3, type: 'view', message: 'Portfolio reached 1000 views', time: '1 day ago' },
    { id: 4, type: 'project', message: 'Project "AI Platform" updated', time: '2 days ago' },
  ];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [statsData, activityData] = await Promise.all([
          fetchDashboardStats(),
          fetchRecentActivity(),
        ]);
        setStats(statsData);
        setRecentActivity(activityData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--neon-cyan))] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[rgb(var(--neon-cyan))] to-[rgb(var(--neon-purple))] bg-opacity-10 border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
        <p className="text-gray-400">Here's what's happening with your portfolio today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Blog Posts"
          value={stats.blogPosts.total.toString()}
          change={stats.blogPosts.change}
          color="cyan"
          icon="📝"
          href="/admin/blog-posts"
        />
        <StatCard
          title="Total Projects"
          value={stats.projects.total.toString()}
          change={stats.projects.change}
          color="purple"
          icon="🚀"
          href="/admin/projects"
        />
        <StatCard
          title="Total Views"
          value={stats.views.total.toLocaleString()}
          change={stats.views.change}
          color="green"
          icon="👁️"
          href="/admin/analytics"
        />
        <StatCard
          title="Contact Messages"
          value={stats.messages.total.toString()}
          change={stats.messages.change}
          color="pink"
          icon="✉️"
          href="/admin/messages"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gray-900 border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>📋</span> Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="p-3 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 hover:border-[rgb(var(--neon-cyan))] hover:border-opacity-50 transition-colors"
              >
                <p className="text-sm">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>⚡</span> Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickActionButton
              icon="➕"
              label="New Blog Post"
              href="/admin/blog-posts"
              color="cyan"
            />
            <QuickActionButton
              icon="🚀"
              label="Add Project"
              href="/admin/projects"
              color="purple"
            />
            <QuickActionButton
              icon="📊"
              label="View Analytics"
              href="/admin/analytics"
              color="green"
            />
            <QuickActionButton
              icon="⚙️"
              label="Settings"
              href="/admin/settings"
              color="pink"
            />
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-gray-900 border border-[rgb(var(--neon-green))] border-opacity-30 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>📈</span> Performance Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            label="Avg. Session Duration"
            value="3m 42s"
            trend="up"
            percentage="+12%"
          />
          <MetricCard
            label="Bounce Rate"
            value="32%"
            trend="down"
            percentage="-8%"
          />
          <MetricCard
            label="Page Load Time"
            value="1.2s"
            trend="down"
            percentage="-15%"
          />
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  color: 'cyan' | 'purple' | 'green' | 'pink';
  icon: string;
  href: string;
}

function StatCard({ title, value, change, color, icon, href }: StatCardProps) {
  const colorClasses = {
    cyan: 'border-[rgb(var(--neon-cyan))] text-[rgb(var(--neon-cyan))]',
    purple: 'border-[rgb(var(--neon-purple))] text-[rgb(var(--neon-purple))]',
    green: 'border-[rgb(var(--neon-green))] text-[rgb(var(--neon-green))]',
    pink: 'border-[rgb(var(--neon-pink))] text-[rgb(var(--neon-pink))]',
  };

  return (
    <Link href={href}>
      <div
        className={`p-6 bg-transparent border ${colorClasses[color]} border-opacity-30 rounded-lg hover:border-opacity-60 transition-all cursor-pointer group relative overflow-hidden`}
      >
        {/* Background glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-5 transition-opacity`} />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-400">{title}</h3>
            <span className="text-2xl">{icon}</span>
          </div>
          <p className={`text-3xl font-bold ${colorClasses[color]} mb-2`}>{value}</p>
          <p className="text-sm text-gray-500">{change}</p>
        </div>
      </div>
    </Link>
  );
}

interface QuickActionButtonProps {
  icon: string;
  label: string;
  href: string;
  color: 'cyan' | 'purple' | 'green' | 'pink';
}

function QuickActionButton({ icon, label, href, color }: QuickActionButtonProps) {
  const colorClasses = {
    cyan: 'bg-[rgb(var(--neon-cyan))] hover:shadow-[0_0_20px_rgba(var(--neon-cyan),0.3)]',
    purple: 'bg-[rgb(var(--neon-purple))] hover:shadow-[0_0_20px_rgba(var(--neon-purple),0.3)]',
    green: 'bg-[rgb(var(--neon-green))] hover:shadow-[0_0_20px_rgba(var(--neon-green),0.3)]',
    pink: 'bg-[rgb(var(--neon-pink))] hover:shadow-[0_0_20px_rgba(var(--neon-pink),0.3)]',
  };

  return (
    <Link
      href={href}
      className={`${colorClasses[color]} bg-opacity-20 border border-current rounded-lg p-4 text-center hover:bg-opacity-30 transition-all`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-sm font-medium">{label}</div>
    </Link>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  trend: 'up' | 'down';
  percentage: string;
}

function MetricCard({ label, value, trend, percentage }: MetricCardProps) {
  return (
    <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg">
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold">{value}</p>
        <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          <span>{trend === 'up' ? '↗' : '↘'}</span>
          <span>{percentage}</span>
        </div>
      </div>
    </div>
  );
}
