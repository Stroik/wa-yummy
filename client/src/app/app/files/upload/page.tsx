import { PageHeader } from '@/components/PageHeader';
import { UploadMedia } from '@/components/forms/UploadMedia';

export default function Upload() {
  return (
    <section id="upload-page">
      <PageHeader
        title="Subir archivos"
        subtitle="Subir archivos para utilizar en las campañas"
        href="/app/files"
      />
      <UploadMedia path='/app/files' />
    </section>
  );
}
