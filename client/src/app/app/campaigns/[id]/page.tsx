import { CampaignId } from '@/components/id/CampaignId';

export default function CampaignById({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <section id="campaign-id">
      <CampaignId id={id} />
    </section>
  );
}
