'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize with a safe default, will be updated on mount
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Apply initial theme class immediately
    const root = document.documentElement;
    const body = document.body;
    
    // Remove any existing theme classes first
    root.classList.remove('light-theme', 'dark-theme');
    body.classList.remove('light-theme', 'dark-theme');
    
    // Add the current theme class
    if (theme === 'light') {
      root.classList.add('light-theme');
      body.classList.add('light-theme');
    } else {
      root.classList.add('dark-theme');
      body.classList.add('dark-theme');
    }
  }, [theme]);

  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    const body = document.body;
    
    // Remove all theme classes first
    root.classList.remove('light-theme', 'dark-theme');
    body.classList.remove('light-theme', 'dark-theme');
    
    // Add the appropriate theme class
    if (theme === 'light') {
      root.classList.add('light-theme');
      body.classList.add('light-theme');
    } else {
      root.classList.add('dark-theme');
      body.classList.add('dark-theme');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Always provide the context, even before mounting
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

