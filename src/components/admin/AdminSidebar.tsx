'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavItemProps {
  icon: string;
  label: string;
  href: string;
  active: boolean;
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: '📊', label: 'Dashboard', href: '/admin/dashboard' },
    { icon: '📝', label: 'Blog Posts', href: '/admin/blog-posts' },
    { icon: '🚀', label: 'Projects', href: '/admin/projects' },
    { icon: '📈', label: 'Analytics', href: '/admin/analytics' },
    { icon: '✉️', label: 'Messages', href: '/admin/messages' },
    { icon: '⚙️', label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-gray-900 border-r border-[rgb(var(--neon-cyan))] border-opacity-30 transition-all duration-300 flex flex-col relative`}
    >
      {/* Header */}
      <div className="p-6 border-b border-[rgb(var(--neon-cyan))] border-opacity-30">
        {!isCollapsed && (
          <>
            <h1 className="text-2xl font-bold text-[rgb(var(--neon-cyan))] tracking-wide">
              Admin Panel
            </h1>
            <p className="text-sm text-gray-400 mt-1">Portfolio CMS</p>
          </>
        )}
        {isCollapsed && (
          <div className="text-3xl text-center">⚡</div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 bg-gray-900 border border-[rgb(var(--neon-cyan))] border-opacity-50 rounded-full p-1 hover:bg-gray-800 transition-colors z-10"
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <svg
          className={`w-4 h-4 text-[rgb(var(--neon-cyan))] transition-transform ${
            isCollapsed ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Navigation */}
      <nav className="mt-6 flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={pathname === item.href}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-[rgb(var(--neon-cyan))] border-opacity-30">
        <Link
          href="/"
          className={`flex items-center gap-2 text-gray-400 hover:text-[rgb(var(--neon-cyan))] transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title="Back to Portfolio"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {!isCollapsed && <span>Back to Portfolio</span>}
        </Link>
      </div>
    </aside>
  );
}

function NavItem({
  icon,
  label,
  href,
  active,
  isCollapsed,
}: NavItemProps & { isCollapsed: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-6 py-3 transition-all relative group ${
        active
          ? 'text-[rgb(var(--neon-cyan))] border-l-4 border-[rgb(var(--neon-cyan))]'
          : 'text-gray-400 hover:text-white border-l-4 border-transparent hover:border-gray-700'
      } ${isCollapsed ? 'justify-center px-0' : ''}`}
    >
      {/* Glow effect for active item */}
      {active && (
        <div className="absolute inset-0 bg-[rgb(var(--neon-cyan))] opacity-10 blur-xl pointer-events-none" />
      )}
      
      <span className="text-xl relative z-10">{icon}</span>
      {!isCollapsed && (
        <span className="font-medium relative z-10">{label}</span>
      )}

      {/* Enhanced glow on hover */}
      {active && (
        <div className="absolute inset-y-0 left-0 w-1 bg-[rgb(var(--neon-cyan))] shadow-[0_0_10px_rgba(var(--neon-cyan),0.5)]" />
      )}

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
          {label}
        </div>
      )}
    </Link>
  );
}
