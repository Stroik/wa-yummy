import { PageHeader } from '@/components/PageHeader';
import { CampaignList } from '@/components/lists/CampaignList';
import { ts } from '@/utils/translate.s';
import Link from 'next/link';

export const metadata = {
  title: 'WAYummy - Campañas de envío',
  description: '',
};

export default function Campaigns() {
  return (
    <section id="campaigns">
      <PageHeader
        title={ts('CAMPAIGNS')}
        subtitle={ts('CAMPAIGNS_LIST_SUBTITLE')}
        href="/app/dashboard"
      >
        <Link className="btn join-item" href="/app/campaigns/new">
          {ts('CREATE')}
        </Link>
      </PageHeader>
      <CampaignList />
    </section>
  );
}
