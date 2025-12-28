import { Locale } from './config';
import en from './locales/en.json';
import es from './locales/es.json';

const dictionaries: Record<Locale, typeof en> = {
  en,
  es,
  hi: en, // TODO: Add Hindi translations
  fr: en, // TODO: Add French translations
  de: en, // TODO: Add German translations
};

export type Dictionary = typeof en;

export const getDictionary = (locale: Locale): Dictionary => {
  return dictionaries[locale] || dictionaries.en;
};

/**
 * Hook-like function to get translations
 * Can be used in server and client components
 */
export function useTranslations(locale: Locale) {
  const dict = getDictionary(locale);

  return {
    t: (key: string): string => {
      const keys = key.split('.');
      let value: any = dict;

      for (const k of keys) {
        value = value?.[k];
      }

      return value || key;
    },
    dict,
  };
}
