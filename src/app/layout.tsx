import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import Providers from '@/components/providers/Providers';

export const metadata: Metadata = {
  title: 'Gundelly Siddartha Yadav | AI/ML Specialist & Full-Stack Developer',
  description: 'Full-stack developer specializing in AI/ML, LLM integration, and cloud-based application deployment. Experience with Python, Java, TensorFlow, LangChain, and more.',
  keywords: ['AI/ML', 'Full-Stack Developer', 'Machine Learning', 'Deep Learning', 'LLM', 'Python', 'TensorFlow', 'LangChain'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

