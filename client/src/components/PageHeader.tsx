'use client';

import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  href?: string;
}

export const PageHeader = ({ title, subtitle, children, href }: PageHeaderProps) => (
  <header className="page-header">
    <div className="title">
      <div className="back-button hidden md:block">
        {href ? (
          <Link href={href} className="btn btn-neutral btn-outline" passHref>
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
        ) : null}
      </div>
      <div className="page-title">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
    </div>
    {children ? <div className="actions join">{children}</div> : null}
  </header>
);
