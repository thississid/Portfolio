'use client';

import { useEffect, useState } from 'react';

interface ViewCounterProps {
  slug: string;
  track?: boolean;
}

export default function ViewCounter({ slug, track = true }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        const response = await fetch('/api/views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        });

        if (response.ok) {
          const data = await response.json();
          setViews(data.views);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to increment views:', error);
        }
      }
    };

    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/views?slug=${encodeURIComponent(slug)}`);
        if (response.ok) {
          const data = await response.json();
          setViews(data.views);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to fetch views:', error);
        }
      }
    };

    if (track) {
      // Increment views on mount
      incrementViews();
    } else {
      // Just fetch current count
      fetchViews();
    }
  }, [slug, track]);

  if (views === null) {
    return <span className="text-[rgb(var(--text-secondary))]">...</span>;
  }

  return (
    <span className="flex items-center gap-2">
      <svg
        className="w-4 h-4 text-[rgb(var(--neon-cyan))]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
      <span className="text-sm text-[rgb(var(--text-secondary))]">
        {views.toLocaleString()} {views === 1 ? 'view' : 'views'}
      </span>
    </span>
  );
}
