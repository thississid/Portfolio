'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Locale, localeNames, localeFlags, i18n } from '@/lib/i18n/config';

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    // Extract the current path without locale prefix
    const currentPath = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    
    // Navigate to the new locale
    const newPath = newLocale === i18n.defaultLocale ? currentPath : `/${newLocale}${currentPath}`;
    
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 hover:border-opacity-100 transition-all duration-300"
        aria-label="Change language"
      >
        <span className="text-xl">{localeFlags[currentLocale]}</span>
        <span className="text-sm font-mono">{localeNames[currentLocale]}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[rgb(var(--bg-primary))] border border-[rgb(var(--neon-cyan))] border-opacity-30 shadow-xl z-50">
            {i18n.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[rgb(var(--neon-cyan))] hover:bg-opacity-10 transition-colors duration-200 ${
                  locale === currentLocale ? 'text-[rgb(var(--neon-cyan))]' : ''
                } ${locale === i18n.locales[0] ? 'rounded-t-lg' : ''} ${
                  locale === i18n.locales[i18n.locales.length - 1] ? 'rounded-b-lg' : ''
                }`}
              >
                <span className="text-xl">{localeFlags[locale]}</span>
                <span className="text-sm font-mono">{localeNames[locale]}</span>
                {locale === currentLocale && (
                  <svg
                    className="w-4 h-4 ml-auto text-[rgb(var(--neon-cyan))]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
