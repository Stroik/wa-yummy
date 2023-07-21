'use client';
import { formatNumber } from '@/utils/formatters';
import { useQuery } from '@tanstack/react-query';
import { _axios as axios } from '@/utils/_axios';
import { useSession } from 'next-auth/react';
import { Loading } from './Loading';
import Link from 'next/link';
import { tc } from '@/utils/translate';

export const getUser = async (id: string) => {
  if (typeof axios.defaults.headers.common['userid'] === 'undefined') return;
  try {
    const response = await axios.get(`/user/${id}`);
    if (response.status !== 200) throw new Error('Error al obtener usuario');
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const DashboardStats = () => {
  const { data: session, status } = useSession();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user', session?.user?.id],
    queryFn: () => getUser(session?.user?.id as string),
    enabled: status === 'authenticated',
  });

  if (status !== 'authenticated' || isLoading || isError) return <Loading />;
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
      <Link className="stat text-center shadow-xl rounded-xl" href="/app/whatsapps" passHref>
        <div className="stat-figure text-primary">
          <i className="ri-whatsapp-line text-4xl"></i>
        </div>
        <div className="stat-title">{tc('WHATSAPPS')}</div>
        <div className="stat-value">{user?._count.Whatsapp}</div>
      </Link>
      <Link className="stat text-center shadow-xl rounded-xl" href="/app/databases" passHref>
        <div className="stat-figure text-primary">
          <i className="ri-contacts-book-2-line text-4xl"></i>
        </div>
        <div className="stat-title">{tc('DATABASES')}</div>
        <div className="stat-value">{user?._count.Book}</div>
      </Link>
      <Link className="stat text-center shadow-xl rounded-xl" href="/app/campaigns" passHref>
        <div className="stat-figure text-primary">
          <i className="ri-megaphone-line text-4xl"></i>
        </div>
        <div className="stat-title">{tc('CAMPAIGNS')}</div>
        <div className="stat-value">{user?._count.Campaign}</div>
      </Link>
      <Link className="stat text-center shadow-xl rounded-xl" href="/app/messages" passHref>
        <div className="stat-figure text-primary">
          <i className="ri-message-line text-4xl"></i>
        </div>
        <div className="stat-title">{tc('MESSAGES')}</div>
        <div className="stat-value">{formatNumber(user?._count.Message)}</div>
      </Link>
    </div>
  );
};
