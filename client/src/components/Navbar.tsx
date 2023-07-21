'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { setUser } from '@/utils/_axios';
import { LangSelector } from './LangSelector';
import { tc } from '@/utils/translate';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  if (status !== 'authenticated') return <UnloggedNavbar path={pathname} />;
  setUser(session?.user?.id as string);

  return <LoggedNavbar user={session?.user} path={pathname} />;
};

const LoggedNavbar = ({ user, path }: any) => (
  <div className="navbar bg-neutral text-neutral-content" id="app-navbar">
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost">
          <i className="ri-menu-2-line text-2xl"></i>
          <span>{tc('MENU')}</span>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-neutral text-neutral-content rounded-box w-52 z-50"
        >
          <NavbarItem
            href="/app/dashboard"
            icon="ri-dashboard-line"
            text={tc('DASHBOARD')}
            path={path}
          />
          <NavbarItem
            href="/app/whatsapps"
            icon="ri-whatsapp-line"
            text={tc('WHATSAPPS')}
            path={path}
          />
          <NavbarItem
            href="/app/databases"
            icon="ri-book-2-line"
            text={tc('DATABASES')}
            path={path}
          />
          <NavbarItem
            href="/app/campaigns"
            icon="ri-megaphone-line"
            text={tc('CAMPAIGNS')}
            path={path}
          />
          <NavbarItem
            href="/app/messages"
            icon="ri-chat-2-line"
            text={tc('MESSAGES')}
            path={path}
          />
          <NavbarItem
            href={user.role === 'admin' ? '/admin/files' : '/app/files'}
            icon="ri-image-add-line text-xl"
            text={tc('FILES')}
            path={path}
          />
        </ul>
      </div>
    </div>

    <div className="navbar-center lg:flex">
      <Link href="/app/dashboard" className="btn btn-ghost normal-case text-xl text-primary">
        {tc('APP_TITLE')}
      </Link>
    </div>

    <div className="navbar-end">
      <LangSelector />
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Image
              src={(user?.image as string) || '/user-placeholder.png'}
              width={40}
              height={40}
              className="w-10 h-10 object-cover"
              alt="Foto de perfil"
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box w-52 z-50"
        >
          <NavbarItem
            href="/app/profile"
            icon="ri-shield-user-line"
            text={tc('PROFILE')}
            path={path}
          />
          {user?.role === 'admin' && (
            <NavbarItem
              href="/admin"
              icon="ri-sound-module-line"
              text={tc('ADMINISTRATION')}
              path={path}
            />
          )}
          <li
            onClick={() =>
              signOut({
                callbackUrl: '/auth/login',
              })
            }
          >
            <a className="py-4">
              <i className="ri-logout-box-line text-xl"></i>
              <span>{tc('LOGOUT')}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const UnloggedNavbar = ({ path }: any) => (
  <div className="navbar bg-neutral text-neutral-content z-50" id="app-navbar">
    <div className="navbar-start"></div>
    <div className="navbar-center lg:flex">
      <Link href="/home" className="btn btn-ghost normal-case text-xl text-primary">
        <span>{tc('APP_TITLE')}</span>
      </Link>
    </div>
    <div className="navbar-end">
      <ul className="menu menu-horizontal px-1 items-center">
        <LangSelector />
        <li>
          <Link href="/auth/login">{tc('LOGIN')}</Link>
        </li>
      </ul>
    </div>
  </div>
);

interface NavbarItemProps {
  href: string;
  icon: string;
  text: string;
  path: string;
}

const NavbarItem = ({ href, icon, text, path }: NavbarItemProps) => (
  <li>
    <Link
      href={href}
      passHref
      className={`${path.includes(text.toLocaleLowerCase()) ? 'bg-primary' : ''} py-4`}
    >
      <i className={`${icon} text-xl`}></i>
      <span>{text}</span>
    </Link>
  </li>
);
