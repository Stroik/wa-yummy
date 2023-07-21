'use client';

import { useIsMounted } from '@/hooks/useIsMounted';
import { useStorage } from '@/hooks/useStorage';
import { useQuery } from '@tanstack/react-query';
import { SessionProvider, useSession } from 'next-auth/react';
import { SetStateAction, createContext, useEffect, useState } from 'react';
import { getWhatsapps } from './lists/WhatsappsList';

type Props = {
  children?: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const ThemeContext = createContext({ theme: '', setTheme: Function });

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useStorage(
    'theme',
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'corporate'
      : 'dark'
  );
  const isMounted = useIsMounted();

  useEffect(() => {
    const root = window.document.documentElement;
    // Get the system color preference
    root.setAttribute('data-theme', theme);
  }, [theme]);

  if (!isMounted) return null;
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const LocaleContext = createContext({ locale: '', setLocale: Function });

export const LocaleProvider = ({ children }: Props) => {
  const [locale, setLocale] = useStorage(
    'locale',
    (process.env.NEXT_PUBLIC_LOCALE as string) ?? 'es'
  );
  const isMounted = useIsMounted();

  const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('lang', locale);
    setCookie('locale', locale, 365);
  }, [locale]);

  if (!isMounted) return null;
  return (
    <LocaleContext.Provider value={{ locale, setLocale }} key={locale}>
      {children}
    </LocaleContext.Provider>
  );
};
