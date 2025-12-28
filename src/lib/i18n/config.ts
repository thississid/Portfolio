/**
 * i18n Configuration
 * Multi-language support for internationalization
 */

export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'es', 'hi', 'fr', 'de'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  hi: 'हिन्दी',
  fr: 'Français',
  de: 'Deutsch',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  hi: '🇮🇳',
  fr: '🇫🇷',
  de: '🇩🇪',
};
