import { ts } from '@/utils/translate.s';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section id="not-found">
      <div className="grid place-items-center place-content-center h-full p-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-center">404</h1>
          <h2 className="text-2xl font-bold text-center">{ts('PAGE_NOT_FOUND')}</h2>
          <p className="text-base text-center py-6">{ts('PAGE_NOT_FOUND_TEXT')}</p>
          <Link href="/app/dashboard" passHref className="btn btn-primary">
            {ts('BACK_TO_HOME')}
          </Link>
        </div>
      </div>
    </section>
  );
}
