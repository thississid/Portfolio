'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import CustomCursor from '@/components/ui/CustomCursor';
import LoadingScreen from '@/components/ui/LoadingScreen';
import ScrollProgress from '@/components/ui/ScrollProgress';
import MatrixRain from '@/components/ui/MatrixRain';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <MatrixRain />
      <ScrollProgress />
      <CustomCursor />
      {children}
    </ThemeProvider>
  );
}

