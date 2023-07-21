'use client';

import { _axios as axios } from '@/utils/_axios';
import { formatDate } from '@/utils/formatters';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Loading } from '../Loading';
import { EmptyList } from '../EmptyList';
import { tc } from '@/utils/translate';

export const getRequests = async () => {
  try {
    const response = await axios.get('/request');
    if (response.status !== 200) throw new Error('Error al obtener las solicitudes');
    return response.data.requests;
  } catch (error) {
    console.error(error);
  }
};

export const RequestList = () => {
  const { status } = useSession();
  const {
    data: requests,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['requests'],
    queryFn: getRequests,
    enabled: status === 'authenticated',
  });

  if (isLoading || isError) return <Loading full={true} />;
  if (requests && requests.length === 0)
    return (
      <EmptyList
        icon="ri-feedback-line"
        title={tc('NO_REQUESTS')}
        subtitle={tc('NO_REQUESTS_MSG')}
        href="/"
      />
    );

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Empresa</th>
              <th>Fecha/Hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {requests?.map((request: any) => (
              <tr key={request.id}>
                <td>
                  {request.firstname} {request.lastname}
                </td>
                <td>{request.email}</td>
                <td>
                  <a
                    href={`https://wa.me/${request.phone}?text=Hola%20${request.firstname}%20${request.lastname}%20!%20`}
                    target="_blank"
                    className="link-primary"
                    rel="noreferrer"
                  >
                    {request.phone}
                  </a>
                </td>
                <td>{request.business}</td>
                <td>{formatDate(request.createdAt)}</td>
                <td>
                  <span className="tooltip tooltip-top" data-tip="Ver solicitud">
                    <Link
                      className="btn btn-primary"
                      href={`/admin/requests/${request.id}`}
                      passHref
                    >
                      <i className="ri-eye-line"></i>
                    </Link>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
