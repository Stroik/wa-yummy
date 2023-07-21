import { cookies } from 'next/headers';
import esTranslations from '@/locale/es.json';
import enTranslations from '@/locale/en.json';

interface LocaleTranslations {
  [key: string]: string;
}

interface AvailableLocales {
  [key: string]: LocaleTranslations;
}

const defaultLocale = process.env.NEXT_PUBLIC_LOCALE || 'en';
const availableLocales: AvailableLocales = {
  es: esTranslations,
  en: enTranslations,
};

export const getCookieLocale = (): string => {
  const cookieStore = cookies();
  const locale = cookieStore.get('locale');
  return locale ? locale.value : defaultLocale;
};

export const ts = (keyword: string): string => {
  const locale: string = getCookieLocale();
  const selectedTranslations = availableLocales[locale];

  if (!selectedTranslations) {
    console.warn(`No translations for lang "${locale}"`);
    return keyword;
  }

  const translation = selectedTranslations[keyword];

  if (!translation) {
    console.warn(`"${keyword}" is not recognize for lang "${locale}"`);
    return keyword;
  }

  return translation;
};
