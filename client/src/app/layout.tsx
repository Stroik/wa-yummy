import 'remixicon/fonts/remixicon.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { QueryProvider } from '@/components/QueryProvider';
import { Toast } from '@/components/Toast';
import { AuthProvider, LocaleProvider, ThemeProvider } from '@/components/Providers';

export const metadata = {
  title: 'WAYummy - Whatsapp Marketing', // TODO: Add translations
  description: '',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={process.env.NEXT_PUBLIC_LOCALE}>
      <body id="wayummy-app">
        <LocaleProvider>
          <ThemeProvider>
            <AuthProvider>
              <header className="z-50">
                <Navbar />
              </header>
              <QueryProvider>
                <main>{children}</main>
              </QueryProvider>
              <footer>
                <span className="text-sm" data-qwik-inspector="routes/layout.tsx:251:9">
                  <a
                    href="http://your-web.net"
                    target="_blank"
                    className="hover:text-secondary"
                    rel="noreferrer"
                  >
                    Your Web &copy; {new Date().getFullYear()}
                  </a>
                </span>
              </footer>
            </AuthProvider>
          </ThemeProvider>
          <Toast />
        </LocaleProvider>
      </body>
    </html>
  );
}
