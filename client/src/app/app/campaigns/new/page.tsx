import { PageHeader } from '@/components/PageHeader';
import { AddCampaign } from '@/components/forms/AddCampaign';
import { ts } from '@/utils/translate.s';

export default function CampaignNew() {
  return (
    <section id="campaign-form">
      <PageHeader
        title={ts('NEW_CAMPAIGN')}
        subtitle={ts('NEW_CAMPAIGN_SUBTITLE')}
        href="/app/campaigns"
      />
      <AddCampaign />
    </section>
  );
}
