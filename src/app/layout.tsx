import type { Metadata, Viewport } from 'next';
import React from 'react';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { generateStructuredData } from '@/lib/structured-data';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import * as Sentry from '@sentry/nextjs';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8B9D77' },
    { media: '(prefers-color-scheme: dark)', color: '#FFB7C5' },
  ],
};

export const metadata: Metadata = {
  title: 'Gundelly Siddartha Yadav | AI Engineer',
  description: 'AI engineer building agentic AI, LLM systems, and production ML — reliable workflows, backends, and governance dashboards. Experience with Python, TensorFlow, LangChain, and more.',
  keywords: ['AI Engineer', 'Agentic AI', 'LLM Systems', 'Machine Learning', 'Deep Learning', 'Python', 'TensorFlow', 'LangChain'],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Gundelly Siddartha Yadav | AI Engineer',
    description: 'AI engineer building agentic AI, LLM systems, and production ML — reliable workflows, backends, and governance dashboards.',
    url: 'https://sid-port-pi.vercel.app',
    siteName: 'Siddartha Yadav Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gundelly Siddartha Yadav | AI Engineer',
    description: 'AI engineer building agentic AI, LLM systems, and production ML — reliable workflows, backends, and governance dashboards.',
  },
  other: {
    ...Sentry.getTraceData(),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = generateStructuredData();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body>
        <ServiceWorkerRegistration />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

