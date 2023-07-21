'use client';

import { Loading } from '@/components/Loading';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const { data: session, status } = useSession();
  const isMounted = useIsMounted();
  const nav = useRouter();

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'unauthenticated') {
    if (isMounted) {
      toast.error('No estás autenticado');
      return nav.push('/auth/login');
    }
    return <></>;
  }

  if (session?.user?.role !== 'admin') {
    if (isMounted) {
      toast.error('No tienes permisos para acceder a esta página');
      return nav.push('/app/dashboard');
    }
    return <></>;
  }

  return <>{children}</>;
}
