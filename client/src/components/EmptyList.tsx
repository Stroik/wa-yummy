import Link from 'next/link';

interface Props {
  icon: string;
  title: string;
  subtitle: string;
  href: string;
  btnText?: string;
}

export const EmptyList = ({ icon, title, subtitle, href, btnText }: Props) => (
  <div className="alert shadow-lg">
    <i className={`${icon} text-4xl`}></i>
    <div>
      <h3 className="font-bold">{title}</h3>
      <div className="text-xs">{subtitle}</div>
    </div>
    {btnText && (
      <Link className="btn btn-sm btn-neutral" href={href} passHref>
        {btnText}
      </Link>
    )}
  </div>
);
