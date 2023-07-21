import { PageHeader } from '@/components/PageHeader';
import { UploadMedia } from '@/components/forms/UploadMedia';
import { ts } from '@/utils/translate.s';

export default function Upload() {
  return (
    <section id="upload-page">
      <PageHeader
        title={ts('UPLOAD_FILES')}
        subtitle={ts('UPLOAD_TO_THE_SERVER')}
        href="/admin/files"
      />
      <UploadMedia path="/admin/files" />
    </section>
  );
}
