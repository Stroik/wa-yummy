import { PageHeader } from '@/components/PageHeader';
import Link from 'next/link';
import { ts } from '@/utils/translate.s';

export default function Admin() {
  return (
    <section id="admin">
      <PageHeader
        title={ts('ADMINISTRATION')}
        subtitle={ts('ADMIN_PAGE_SUBTITLE')}
        href="/app/dashboard"
      />
      <div className="divider">{ts('ACTIONS')}</div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center !pt-6 gap-1">
            <i className="ri-group-line text-5xl pb-2"></i>
            <h2 className="card-title">{ts('CLIENTS')}</h2>
            <p>{ts('ADMIN_PAGE_CARD_DESC_1')}</p>
            <div className="card-actions justify-end my-2">
              <Link href="/admin/users" className="btn btn-primary btn-block">
                {ts('MANAGE')}
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center !pt-6 gap-1">
            <i className="ri-image-add-line text-5xl pb-2"></i>
            <h2 className="card-title"> {ts('MEDIA_FILES')}</h2>
            <p>{ts('ADMIN_PAGE_CARD_DESC_2')}</p>
            <div className="card-actions justify-end my-2">
              <Link href="/admin/files/" className="btn btn-primary btn-block">
                {ts('MANAGE')}
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center !pt-6 gap-1">
            <i className="ri-contacts-book-2-line text-5xl pb-2"></i>
            <h2 className="card-title">{ts('VALIDATE_NUMBERS')}</h2>
            <p>{ts('ADMIN_PAGE_CARD_DESC_3')}</p>
            <div className="card-actions justify-end my-2">
              <Link href="/admin/validate/" className="btn btn-primary btn-block">
                {ts('VALIDATE')}
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center !pt-6 gap-1">
            <i className="ri-feedback-fill text-5xl pb-2"></i>
            <h2 className="card-title">{ts('REQUESTS')}</h2>
            <p>{ts('ADMIN_PAGE_CARD_DESC_4')}</p>
            <div className="card-actions justify-end my-2">
              <Link href="/admin/requests/" className="btn btn-primary btn-block">
                {ts('GO')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
