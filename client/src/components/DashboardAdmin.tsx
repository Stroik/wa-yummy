'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Loading } from './Loading';
import { tc } from '@/utils/translate';

export const DashboardAdmin = () => {
  const { data: session, status } = useSession();

  if (status !== 'authenticated') return <Loading />;

  return (
    <>
      {session.user.role === 'admin' && (
        <>
          <div className="divider">{tc('ADMIN_ACTIONS')}</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div className="card bg-neutral-content text-neutral-focus">
              <div className="card-body items-center text-center !pt-6 gap-0">
                <i className="ri-whatsapp-line text-4xl pb-4"></i>
                <h2 className="card-title">{tc('ADMIN_BOX_TITLE_1')}</h2>
                <p>{tc('ADMIN_BOX_TEXT_1')}</p>
                <div className="card-actions my-1">
                  <Link href="/admin/validate" className="btn btn-primary btn-block group" passHref>
                    <span>{tc('GO')}</span>
                    <i className="ri-arrow-right-s-line text-xl group-hover:animate-pulse"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="card bg-neutral-content text-neutral-focus">
              <div className="card-body items-center text-center !pt-6 gap-0">
                <i className="ri-image-line text-4xl pb-4"></i>
                <h2 className="card-title">{tc('ADMIN_BOX_TITLE_2')}</h2>
                <p>{tc('ADMIN_BOX_TEXT_2')}</p>
                <div className="card-actions my-1">
                  <Link href="/admin/files/" className="btn btn-primary btn-block group" passHref>
                    <span>{tc('UPLOAD')}</span>
                    <i className="ri-arrow-right-s-line text-xl group-hover:animate-pulse"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="card bg-neutral-content text-neutral-focus">
              <div className="card-body items-center text-center !pt-6 gap-0">
                <i className="ri-group-line text-4xl pb-4"></i>
                <h2 className="card-title">{tc('ADMIN_BOX_TITLE_3')}</h2>
                <p>{tc('ADMIN_BOX_TEXT_3')}</p>
                <div className="card-actions my-1">
                  <Link href="/admin/users/" className="btn btn-primary btn-block group" passHref>
                    <span>{tc('GO')}</span>
                    <i className="ri-arrow-right-s-line text-xl group-hover:animate-pulse"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="card bg-neutral-content text-neutral-focus">
              <div className="card-body items-center text-center !pt-6 gap-0">
                <i className="ri-file-list-3-line text-4xl pb-4"></i>
                <h2 className="card-title">{tc('ADMIN_BOX_TITLE_4')}</h2>
                <p>{tc('ADMIN_BOX_TEXT_4')}</p>
                <div className="card-actions my-1">
                  <Link
                    href="/admin/requests/"
                    className="btn btn-primary btn-block group"
                    passHref
                  >
                    <span>{tc('GO')}</span>
                    <i className="ri-arrow-right-s-line text-xl group-hover:animate-pulse"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
