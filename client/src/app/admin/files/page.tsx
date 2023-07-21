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
        title={ts('FILE_LIST')}
        subtitle={ts('FILE_LIST_SUBTITLE')}
        href="/admin"
      >
        <Link href="/admin/files/upload" className="btn btn-secondary join-item" passHref>
          {ts('UPLOAD')}
        </Link>
      </PageHeader>

      <FileList />
    </section>
  );
}
