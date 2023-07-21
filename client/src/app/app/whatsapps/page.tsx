import { PageHeader } from '@/components/PageHeader';
import { Refresh } from '@/components/Refresh';
import { AddWhatsapp } from '@/components/forms/AddWhatsapp';
import { WhatsappsList } from '@/components/lists/WhatsappsList';
import { ts } from '@/utils/translate.s';

export const metadata = {
  title: 'WAYummy - Listado de enviadores',
  description: '',
};

export default function Whatsapps() {
  return (
    <section id="whatsapp">
      <PageHeader
        title={ts('WHATSAPPS_LIST')}
        subtitle={ts('WHATSAPPS_LIST_SUBTITLE')}
        href="/app/dashboard"
      >
        <Refresh queryKey="whatsapps" tooltip={ts('UPDATE')} />
        <AddWhatsapp />
      </PageHeader>
      <WhatsappsList />
    </section>
  );
}
