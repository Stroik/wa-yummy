import { PageHeader } from '@/components/PageHeader';
import { RequestList } from '@/components/lists/RequestList';
import { ts } from '@/utils/translate.s';

export const metadata = {
  title: 'WAYummy - Solicitudes de demo',
  description: '',
};

export default function Request() {
  return (
    <section id="request-list">
      <PageHeader
        title={ts('DEMO_REQUEST')}
        subtitle={ts('DEMO_REQUEST_SUBTITLE')}
        href="/admin/"
      />
      <RequestList />
    </section>
  );
}
