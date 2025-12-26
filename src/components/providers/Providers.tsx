'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import CustomCursor from '@/components/ui/CustomCursor';
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <CustomCursor />
      {children}
    </ThemeProvider>
  );
}

