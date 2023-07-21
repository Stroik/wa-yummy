'use client';

import { _axios as axios } from '@/utils/_axios';
import { formatDate } from '@/utils/formatters';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { PageHeader } from '../PageHeader';
import Link from 'next/link';

export const getRequest = async (id: string) => {
  try {
    const response = await axios.get(`/request/${id}`);
    if (response.status !== 200) throw new Error('Error al obtener la solicitud');
    return response.data.request;
  } catch (error) {
    console.error(error);
  }
};

export const RequestId = ({ id }: { id: string }) => {
  const { status } = useSession();
  const { data: request } = useQuery({
    queryKey: ['request', id],
    queryFn: () => getRequest(id),
    enabled: status === 'authenticated',
  });

  return (
    <section id="request">
      <PageHeader
        title={`Solicitud de ${request?.firstname} ${request?.lastname}`}
        subtitle="Aquí puedes ver los detalles de la solicitud"
        href="/admin/requests"
      />
      <div className="overflow-x-auto">
        <table className="table">
          <tbody>
            <tr>
              <td>
                <strong>Nombre</strong>
              </td>
              <td>
                {request?.firstname} {request?.lastname}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Correo</strong>
              </td>
              <td>{request?.email}</td>
            </tr>
            <tr>
              <td>
                <strong>Teléfono</strong>
              </td>
              <td>
                <a
                  href={`https://wa.me/${request?.phone}?text=Hola%20${request?.firstname}%20${request?.lastname}%20!%20`}
                  target="_blank"
                  className="link-primary"
                  rel="noreferrer"
                >
                  {request?.phone}
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Empresa</strong>
              </td>
              <td>{request?.business}</td>
            </tr>
            <tr>
              <td>
                <strong>Fecha/Hora</strong>
              </td>
              <td>{formatDate(request?.createdAt)}</td>
            </tr>
            <tr>
              <td>
                <strong>Mensaje</strong>
              </td>
              <td>{request?.message}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center my-4">
        <Link href="/admin/requests" passHref className="btn btn-secondary mr-2">
          Regresar
        </Link>
        <Link
          href={`/admin/users/new?name=${request?.firstname}%20${request?.lastname}&email=${request?.email}`}
          passHref
          className="btn btn-primary"
        >
          Agregar nuevo usuario
        </Link>
      </div>
    </section>
  );
};
