import { DashboardAdmin } from '@/components/DashboardAdmin';
import { DashboardStats } from '@/components/DashboardStats';
import { ts } from '@/utils/translate.s';
import Link from 'next/link';

export const metadata = {
  title: 'WAYummy - Escritorio',
  description: '',
};

export default function Dashboard() {
  return (
    <section>
      <div className="divider">{ts('STATISTICS').toUpperCase()}</div>
      <DashboardStats />
      <div className="divider">{ts('ACTIONS').toUpperCase()}</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center !pt-6 gap-1">
            <i className="ri-whatsapp-line text-4xl pb-4"></i>
            <h2 className="card-title">{ts('DASHBOARD_CARD_TITLE_1')}</h2>
            <p>{ts('DASHBOARD_CARD_DESC_1')}</p>
            <div className="card-actions justify-end my-4">
              <Link href="/app/whatsapps/" className="btn btn-primary btn-wide">
                {ts('WATCH')}
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center !pt-6 gap-1">
            <i className="ri-contacts-book-2-line text-4xl pb-4"></i>
            <h2 className="card-title">{ts('DASHBOARD_CARD_TITLE_2')}</h2>
            <p>{ts('DASHBOARD_CARD_DESC_2')}</p>
            <div className="card-actions justify-end my-4">
              <Link href="/app/databases/" className="btn btn-primary btn-wide">
                {ts('ADD')}
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center !pt-6 gap-1">
            <i className="ri-megaphone-line text-4xl pb-4"></i>
            <h2 className="card-title">{ts('DASHBOARD_CARD_TITLE_3')}</h2>
            <p>{ts('DASHBOARD_CARD_DESC_3')}</p>
            <div className="card-actions justify-end my-4">
              <Link href="/app/campaigns/" className="btn btn-primary btn-wide">
                {ts('NEW_CAMPAIGN')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <DashboardAdmin />
    </section>
  );
}
