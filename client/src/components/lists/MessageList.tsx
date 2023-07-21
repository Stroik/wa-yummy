'use client';

import Link from 'next/link';
import { PageHeader } from '../PageHeader';
import { formatDate } from '@/utils/formatters';
import { useQuery } from '@tanstack/react-query';
import { getCampaigns } from './CampaignList';
import { useSession } from 'next-auth/react';
import { _axios as axios } from '@/utils/_axios';
import { useEffect, useState } from 'react';
import { Refresh } from '../Refresh';
import { EmptyList } from '../EmptyList';
import { Loading } from '../Loading';
import { tc } from '@/utils/translate';

export const getMessages = async (query: any) => {
  try {
    const params = new URLSearchParams(query);
    const page = params.get('page') ?? '1';
    const pageSize = params.get('pageSize') ?? '10';
    const campaignId = params.get('campaignId') ?? '';
    const status = params.get('status') ?? '';

    const response = await axios.get(
      `/message?page=${page}&pageSize=${pageSize}&campaignId=${campaignId}&status=${status}`
    );

    if (response.status !== 200) throw new Error('Error getting messages');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const MessageList = ({ searchParams }: { searchParams: any }) => {
  const { status } = useSession();

  const { data: campaigns } = useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns,
    enabled: status === 'authenticated',
  });

  const {
    data: messages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['messages', searchParams],
    queryFn: () => getMessages(searchParams),
    enabled: status === 'authenticated',
  });

  const [page, setPage] = useState(messages?.currentPage ?? '1');
  const [pageSize, setPageSize] = useState('10');
  const [campaignId, setCampaignId] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [totalPages, setTotalPages] = useState(messages?.totalPages ?? '1');
  const [startPage, setStartPage] = useState<number>(0);
  const [pages, setPages] = useState<any[]>([]);

  const maxPageLinks = 10;

  const setUrl = (page: string, pageSize: string, campaignId: string, statusMsg: string) => {
    const newUrl = `/app/messages?page=${page}&pageSize=${pageSize}&campaignId=${campaignId}&status=${statusMsg}`;
    return newUrl;
  };

  useEffect(() => {
    setPage(messages?.currentPage ?? '1');
    setPageSize('10');
    setCampaignId('');
    setStatusMsg('');
    setTotalPages(messages?.totalPages ?? '1');
    const _startPage = Math.max(
      Math.min(page - Math.floor(maxPageLinks / 2), totalPages - maxPageLinks),
      0
    );
    const _pages = Array.from(
      { length: Math.min(maxPageLinks, totalPages) },
      (_, i) => startPage + i + 1
    );
    setStartPage(_startPage);
    setPages(_pages as any[]);
  }, [messages, page, totalPages, maxPageLinks, startPage]);

  if (isLoading || isError) return <Loading full={true} />;
  return (
    <>
      <PageHeader
        title={tc('MESSAGES')}
        subtitle={tc('MESSAGES_LIST_SUBTITLE')}
        href="/app/dashboard"
      >
        <div className="join">
          <Refresh queryKey="messages" tooltip={tc('UPDATE')} />
          <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="btn btn-secondary btn-outline join-item">
              Estado
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
              <li>
                <Link
                  className={statusMsg === 'SENT' ? 'menu-link active' : 'menu-link'}
                  href={setUrl(page, pageSize, campaignId, 'SENT')}
                >
                  {tc('STATUS_SENT')}
                </Link>
              </li>
              <li>
                <Link
                  className={statusMsg === 'RECEIVED' ? 'menu-link active' : 'menu-link'}
                  href={setUrl(page, pageSize, campaignId, 'RECEIVED')}
                >
                  {tc('STATUS_RECEIVED')}
                </Link>
              </li>
              <li>
                <Link className="menu-link" href={setUrl(page, pageSize, '', '')}>
                  {tc('STATUS_ALL')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-bottom dropdown-end z-50">
            <label
              tabIndex={0}
              className="btn btn-secondary md:!rounded-l-none md:!rounded-r-md join-item"
            >
              {tc('CAMPAIGN')}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {campaigns?.map((campaign: any) => (
                <li key={campaign.id}>
                  <Link
                    className={campaignId === campaign.id ? 'menu-link active' : 'menu-link'}
                    href={setUrl(page, pageSize, campaign.id, statusMsg)}
                  >
                    {campaign.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="menu-link" href={setUrl(page, pageSize, '', '')}>
                  {tc('ALL_CAMPAIGNS')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </PageHeader>

      {messages?.messages && messages?.messages.length === 0 ? (
        <EmptyList
          icon="ri-message-line"
          title={tc('NO_MESSAGES')}
          subtitle={tc('NO_MESSAGES_MSG')}
          href="/app/campaigns/new"
          btnText={tc('CREATE')}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>{tc('DATE')}</th>
                <th>{tc('PHONE')}</th>
                <th>{tc('MESSAGE')}</th>
                <th>{tc('STATUS')}</th>
              </tr>
            </thead>
            <tbody>
              {messages?.messages.map((message: any) => (
                <tr key={message.id}>
                  <td className="text-sm">{formatDate(message.createdAt)}</td>
                  <td>{message.from}</td>
                  <td>{String(message.text).slice(0, 50)}...</td>
                  <td>
                    <span
                      className="tooltip"
                      data-tip={message.status === 'SENT' ? 'Enviado' : 'Recibido'}
                    >
                      {message.status === 'SENT' ? (
                        <i className="ri-check-line text-xl text-primary"></i>
                      ) : (
                        <Link
                          href={`https://wa.me/${message.from}?text=Hola!`}
                          passHref
                          target="_blank"
                        >
                          <i className="ri-reply-line text-xl text-primary"></i>
                        </Link>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination w-full flex items-center justify-center my-4">
            <div className="join">
              {page > 1 ? (
                <Link
                  className="btn btn-primary join-item"
                  href={setUrl(String(page - 1), pageSize, campaignId, statusMsg)}
                  passHref
                >
                  <i className="ri-arrow-left-line"></i>
                </Link>
              ) : (
                <button className="btn btn-outline join-item" disabled id="prev">
                  <i className="ri-arrow-right-line"></i>
                </button>
              )}
              {pages?.map((_page) => (
                <Link
                  key={_page}
                  className={`btn join-item ${page === _page ? 'btn-primary' : 'btn-secondary'}`}
                  href={setUrl(String(_page), pageSize, campaignId, statusMsg)}
                >
                  {_page}
                </Link>
              ))}
              {totalPages > startPage + maxPageLinks && (
                <button className="btn btn-ghost join-item">...</button>
              )}
              {page < totalPages ? (
                <Link
                  className="btn btn-primary join-item"
                  href={setUrl(String(page + 1), pageSize, campaignId, statusMsg)}
                  passHref
                >
                  <i className="ri-arrow-right-line"></i>
                </Link>
              ) : (
                <button className="btn btn-outline join-item" disabled id="next">
                  <i className="ri-arrow-right-line"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
