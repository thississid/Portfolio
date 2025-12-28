'use client';

import { useState } from 'react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const pageViews = {
    '7d': [45, 62, 38, 71, 54, 83, 67],
    '30d': Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)),
    '90d': Array.from({ length: 90 }, () => Math.floor(Math.random() * 100)),
  };

  const topPages = [
    { path: '/', views: 456, bounceRate: 32, avgTime: '3:42' },
    { path: '/blog', views: 234, bounceRate: 28, avgTime: '4:15' },
    { path: '/projects', views: 189, bounceRate: 35, avgTime: '2:30' },
    { path: '/blog/rul-prediction', views: 156, bounceRate: 22, avgTime: '6:20' },
    { path: '/contact', views: 123, bounceRate: 45, avgTime: '1:50' },
  ];

  const referrers = [
    { source: 'Direct', visits: 523, percentage: 42 },
    { source: 'Google', visits: 345, percentage: 28 },
    { source: 'GitHub', visits: 189, percentage: 15 },
    { source: 'LinkedIn', visits: 145, percentage: 12 },
    { source: 'Other', visits: 38, percentage: 3 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-gray-400">Track your portfolio performance</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setTimeRange('7d')}
          className={`px-4 py-2 rounded-lg transition-all ${
            timeRange === '7d'
              ? 'bg-[rgb(var(--neon-green))] text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Last 7 Days
        </button>
        <button
          onClick={() => setTimeRange('30d')}
          className={`px-4 py-2 rounded-lg transition-all ${
            timeRange === '30d'
              ? 'bg-[rgb(var(--neon-green))] text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Last 30 Days
        </button>
        <button
          onClick={() => setTimeRange('90d')}
          className={`px-4 py-2 rounded-lg transition-all ${
            timeRange === '90d'
              ? 'bg-[rgb(var(--neon-green))] text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Last 90 Days
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Views"
          value="12,456"
          change="+15%"
          trend="up"
          color="green"
        />
        <MetricCard
          title="Unique Visitors"
          value="8,234"
          change="+12%"
          trend="up"
          color="cyan"
        />
        <MetricCard
          title="Avg. Session"
          value="3m 42s"
          change="+8%"
          trend="up"
          color="purple"
        />
        <MetricCard
          title="Bounce Rate"
          value="32%"
          change="-5%"
          trend="down"
          color="pink"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page Views Chart */}
        <div className="p-6 bg-gray-900 border border-[rgb(var(--neon-green))] border-opacity-30 rounded-lg">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span>📊</span> Page Views
          </h2>
          <div className="h-64 flex items-end justify-between gap-1">
            {pageViews[timeRange].slice(0, timeRange === '7d' ? 7 : 30).map((value, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-[rgb(var(--neon-green))] to-[rgb(var(--neon-cyan))] bg-opacity-50 rounded-t hover:opacity-80 transition-opacity cursor-pointer relative group"
                style={{ height: `${value}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {value} views
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="p-6 bg-gray-900 border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span>🌐</span> Traffic Sources
          </h2>
          <div className="space-y-4">
            {referrers.map((referrer, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">{referrer.source}</span>
                  <span className="text-sm font-semibold">{referrer.visits} ({referrer.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[rgb(var(--neon-cyan))] to-[rgb(var(--neon-purple))] h-2 rounded-full transition-all"
                    style={{ width: `${referrer.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages Table */}
      <div className="bg-gray-900 border border-[rgb(var(--neon-pink))] border-opacity-30 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span>🔝</span> Top Pages
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Page</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Views</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Bounce Rate</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Avg. Time</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((page, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 hover:bg-gray-800 hover:bg-opacity-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <code className="text-sm text-[rgb(var(--neon-pink))]">{page.path}</code>
                  </td>
                  <td className="text-right py-3 px-4 font-semibold">{page.views}</td>
                  <td className="text-right py-3 px-4">
                    <span
                      className={`${
                        page.bounceRate < 30
                          ? 'text-green-400'
                          : page.bounceRate < 40
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}
                    >
                      {page.bounceRate}%
                    </span>
                  </td>
                  <td className="text-right py-3 px-4">{page.avgTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-gray-900 border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg">
          <h3 className="text-sm text-gray-400 mb-2">Most Popular Blog Post</h3>
          <p className="text-lg font-semibold text-[rgb(var(--neon-cyan))]">RUL Prediction</p>
          <p className="text-sm text-gray-500 mt-1">234 views this week</p>
        </div>
        <div className="p-6 bg-gray-900 border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg">
          <h3 className="text-sm text-gray-400 mb-2">Most Viewed Project</h3>
          <p className="text-lg font-semibold text-[rgb(var(--neon-purple))]">AI Platform</p>
          <p className="text-sm text-gray-500 mt-1">189 views this week</p>
        </div>
        <div className="p-6 bg-gray-900 border border-[rgb(var(--neon-green))] border-opacity-30 rounded-lg">
          <h3 className="text-sm text-gray-400 mb-2">Peak Traffic Hour</h3>
          <p className="text-lg font-semibold text-[rgb(var(--neon-green))]">2:00 PM - 3:00 PM</p>
          <p className="text-sm text-gray-500 mt-1">UTC timezone</p>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: 'cyan' | 'purple' | 'green' | 'pink';
}

function MetricCard({ title, value, change, trend, color }: MetricCardProps) {
  const colorClasses = {
    cyan: 'border-[rgb(var(--neon-cyan))] text-[rgb(var(--neon-cyan))]',
    purple: 'border-[rgb(var(--neon-purple))] text-[rgb(var(--neon-purple))]',
    green: 'border-[rgb(var(--neon-green))] text-[rgb(var(--neon-green))]',
    pink: 'border-[rgb(var(--neon-pink))] text-[rgb(var(--neon-pink))]',
  };

  return (
    <div className={`p-4 bg-gray-900 border ${colorClasses[color]} border-opacity-30 rounded-lg hover:border-opacity-60 transition-all group relative overflow-hidden`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-5 transition-opacity`} />
      <div className="relative z-10">
        <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
        <p className={`text-2xl font-bold ${colorClasses[color]} mb-1`}>{value}</p>
        <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          <span>{trend === 'up' ? '↗' : '↘'}</span>
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
}
