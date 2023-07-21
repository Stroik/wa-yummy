'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PageHeader } from '../PageHeader';
import { Loading } from '../Loading';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Pagination } from '../Pagination';
import { _axios as axios } from '@/utils/_axios';
import { useSession } from 'next-auth/react';

export interface Contact {
  id: string;
  name: string;
  phone: number;
  info: string;
}

export const getContact = async (id: string, params: string) => {
  if (typeof axios.defaults.headers.common['userid'] === 'undefined') return;
  try {
    const response = await axios(`/book/${id}?${params}`);
    if (response.status !== 200) throw new Error('Error al obtener la agenda');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteContact = async (contacts: Contact[]) => {
  if (typeof axios.defaults.headers.common['userid'] === 'undefined') return;
  try {
    const response = await axios.delete(`/book/contacts/delete`, { data: contacts });
    if (response.status !== 200) throw new Error('Error al eliminar el contacto');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const BookId = ({ id, searchParams }: { id: string; searchParams: any }) => {
  const { status } = useSession();
  const { mutate } = useMutation(deleteContact);
  const query = useQueryClient();
  const [selected, setSelected] = useState<Contact[]>([]);
  const [page, setPage] = useState<string | number>(searchParams.page || 1);
  const [pageSize, setPageSize] = useState<string | number>(searchParams.pageSize || 10);
  const [params, setParams] = useState<string>('');
  const { data, isLoading, isError } = useQuery({
    queryKey: ['book', id, params],
    queryFn: () => getContact(id, params),
    enabled: status === 'authenticated',
  });
  const [totalPages, setTotalPages] = useState(data?.pagination?.totalPages || null);

  const handleSelect = (event: FormEvent<HTMLInputElement>, id: string) => {
    if (event.currentTarget.checked) {
      const contact = data.book.Contact.find((contact: Contact) => contact.id === id);
      if (contact) setSelected((prev) => [...prev, contact]);
    } else {
      setSelected((prev) => prev.filter((contact) => contact.id !== id));
    }
  };

  const handleDelete = () => {
    mutate(selected, {
      onSuccess: () => {
        toast.success(
          `${selected.length} ${
            selected.length > 1 ? 'Contactos eliminados' : 'contacto eliminado'
          } correctamente`
        );
        query.invalidateQueries(['book']);
        setSelected([]);
        return;
      },
      onError: () => {
        toast.error('Error al eliminar el contacto');
        query.invalidateQueries(['book']);
        return;
      },
    });
    return;
  };

  useEffect(() => {
    setTotalPages(data?.pagination?.totalPages || null);
    setParams(`page=${page}&pageSize=${pageSize}`);
  }, [data, page, pageSize]);

  if (isLoading || isError) return <Loading full={true} />;
  return (
    <section id="book">
      <PageHeader
        title={data?.book?.name || '...'}
        subtitle={data?.book?.description || '...'}
        href="/app/databases"
      />
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Celular</th>
              <th>Información</th>
              {/* <th>
                <span className="tooltip tooltip-left" data-tip="Eliminar" onClick={handleDelete}>
                  <i className="ri-delete-bin-line text-xl pl-1"></i>
                </span>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {data?.book?.Contact?.map((contact: Contact) => (
              <tr key={contact.id}>
                <td>{contact.name || 'Sin nombre'}</td>
                <td>{contact.phone}</td>
                <td>{contact.info || 'No hay información extra'}</td>
                {/* <td width={25}>
                  <label className="label cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      onChange={(event) => handleSelect(event, contact.id)}
                    />
                  </label>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {data?.book?.Contact?.length >= 10 && (
          <Pagination
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalPages={totalPages}
          />
        )}
      </div>
    </section>
  );
};
