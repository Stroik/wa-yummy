import { ts } from '@/utils/translate.s';
import Link from 'next/link';

export const metadata = {
  title: 'WAYummy - Plataforma de difusión de Whatsapp	',
  description: '',
};

export default function Home() {
  return (
    <div className="absolute top-0 left-0 z-0 h-full w-full text-slate-50 scroll-smooth">
      <div className="hero absolute min-h-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="sm:max-w-xs md:max-w-lg lg:max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">{ts('HOME_TITLE')}</h1>
            <p className="mb-5">{ts('HOME_SUBTITLE')}</p>
            <Link href="/request" className="btn btn-primary group" passHref>
              <span>{ts('REQUEST_DEMO')}</span>
              <i className="ri-ghost-2-line text-2xl"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="slider">
        <div className="slide"></div>
        <div className="slide"></div>
        <div className="slide"></div>
      </div>
    </div>
  );
}
