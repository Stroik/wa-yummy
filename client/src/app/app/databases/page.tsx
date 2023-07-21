import { PageHeader } from '@/components/PageHeader';
import { BookList } from '@/components/lists/BookList';
import { ts } from '@/utils/translate.s';
import Link from 'next/link';

export const metadata = {
  title: 'WAYummy - Base de datos',
  description: '',
};

export default function Books() {
  return (
    <section id="books">
      <PageHeader
        title={ts('DATABASE_LIST')}
        subtitle={ts('DATABASE_LIST_SUBTITLE')}
        href="/app/dashboard"
      >
        <Link href="/app/databases/new" className="btn btn-secondary join-item" passHref>
          <span>{ts('UPLOAD')}</span>
        </Link>
      </PageHeader>
      <BookList />
    </section>
  );
}
