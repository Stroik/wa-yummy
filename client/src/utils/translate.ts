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

const getLocale = (): string => {
  const htmlLang = document.documentElement.lang;
  let locale = htmlLang || defaultLocale;

  if (!localStorage.getItem('locale')) {
    localStorage.setItem('locale', locale);
  }

  return locale;
};

export const tc = (keyword: string): string => {
  const locale = getLocale();
  const selectedTranslations = availableLocales[locale];

  if (!selectedTranslations) {
    console.warn(`No se encontraron traducciones para el idioma "${locale}"`);
    return keyword;
  }

  const translation = selectedTranslations[keyword];

  if (!translation) {
    console.warn(
      `No se encontró la traducción para la clave "${keyword}" en el idioma "${locale}"`
    );
    return keyword;
  }

  return translation;
};