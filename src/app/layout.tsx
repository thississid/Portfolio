import type { Metadata, Viewport } from 'next';
import React from 'react';
import './globals.css';
import Providers from '@/components/providers/Providers';
import { Analytics } from '@vercel/analytics/next';
import { generateStructuredData } from '@/lib/structured-data';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import * as Sentry from '@sentry/nextjs';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0ea5e9' },
    { media: '(prefers-color-scheme: dark)', color: '#ec4899' },
  ],
};

export const metadata: Metadata = {
  title: 'Gundelly Siddartha Yadav | AI/ML Specialist & Full-Stack Developer',
  description: 'Full-stack developer specializing in AI/ML, LLM integration, and cloud-based application deployment. Experience with Python, Java, TensorFlow, LangChain, and more.',
  keywords: ['AI/ML', 'Full-Stack Developer', 'Machine Learning', 'Deep Learning', 'LLM', 'Python', 'TensorFlow', 'LangChain'],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Gundelly Siddartha Yadav | AI/ML Specialist & Full-Stack Developer',
    description: 'Full-stack developer specializing in AI/ML, LLM integration, and cloud-based application deployment.',
    url: 'https://sid-port-pi.vercel.app',
    siteName: 'Siddartha Yadav Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gundelly Siddartha Yadav | AI/ML Specialist',
    description: 'Full-stack developer specializing in AI/ML, LLM integration, and cloud-based application deployment.',
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
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const theme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body>
        <ServiceWorkerRegistration />
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

