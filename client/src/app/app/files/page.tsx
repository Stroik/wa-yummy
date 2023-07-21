import { PageHeader } from '@/components/PageHeader';
import { FileList } from '@/components/lists/FileList';
import { ts } from '@/utils/translate.s';
import Link from 'next/link';

export const metadata = {
  title: 'WAYummy - Subida de archivos',
  description: '',
};

export default function Files() {
  return (
    <section id="files" className="overflow-x-hidden">
      <PageHeader
        title="Listado de archivos"
        subtitle="Listado de archivos subidos al servidor"
        href="/app/dashboard"
      >
        <Link href="/app/files/upload" className="btn btn-secondary join-item" passHref>
          {ts('UPLOAD')}
        </Link>
      </PageHeader>

      <FileList />
    </section>
  );
}
