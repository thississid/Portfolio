'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import LoadingScreen from '@/components/ui/LoadingScreen';
import ScrollProgress from '@/components/ui/ScrollProgress';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <ScrollProgress />
      {children}
    </ThemeProvider>
  );
}

