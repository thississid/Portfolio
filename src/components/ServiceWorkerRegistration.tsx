'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Service Worker registered:', registration);
          }
        })
        .catch((error) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Service Worker registration failed:', error);
          }
        });
    }
  }, []);

  return null;
}
