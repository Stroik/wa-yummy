'use client';
import Image from 'next/image';
import Link from 'next/link';
import { _axios as axios } from '@/utils/_axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loading } from '../Loading';
import { Modal } from '../Modal';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { EmptyList } from '../EmptyList';
import { tc } from '@/utils/translate';

interface IBook {
  id: string;
  name: string;
  description: string;
  _count: {
    Contact: number;
  };
}

export const getBooks = async () => {
  if (typeof axios.defaults.headers.common['userid'] === 'undefined') return;
  try {
    const response = await axios('/book');
    if (response.status !== 200) throw new Error('Error getting books');
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = async (id: string) => {
  if (typeof axios.defaults.headers.common['userid'] === 'undefined') return;
  try {
    const response = await axios.delete(`/book/delete`, { data: { id } });
    if (response.status !== 200) throw new Error('Error deleting book');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const BookList = () => {
  const { status } = useSession();
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    enabled: status === 'authenticated',
  });

  if (isLoading || isError) return <Loading full={true} />;
  if (books && books.length === 0)
    return (
      <EmptyList
        icon="ri-book-2-line"
        title={tc('NO_DATABASES')}
        subtitle={tc('NO_DATABASE_MSG')}
        href="/app/databases/new"
        btnText={tc('UPLOAD')}
      />
    );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books?.map((book: IBook) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

const BookItem = ({ id, name, description, _count: { Contact } }: IBook) => {
  const query = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ['deleteBook', id],
    mutationFn: deleteBook,
  });

  const handleDelete = async (id: string) => {
    try {
      mutate(id, {
        onSuccess: () => {
          query.invalidateQueries(['books']);
          toast.success('Agenda eliminada con éxito');
        },
        onError: () => {
          toast.error('Error eliminando agenda');
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card bg-neutral text-neutral-content">
      <figure className="relative">
        <Image
          src="/card-bg.png"
          alt="Avatar"
          width={300}
          height={300}
          className="object-cover w-full max-h-36 bg-primary grayscale"
        />
        <i className="ri-contacts-book-2-line text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
      </figure>
      <div className="card-body items-center text-center gap-0 ">
        <span className="text-xl">{name}</span>
        <span>{description}</span>
        <span>{Contact} contactos</span>
      </div>
      <div className="card-actions">
        <div className="grid grid-cols-2 join justify-center w-full p-2">
          <Modal
            closeText="Cancelar"
            confirm={
              <span onClick={() => handleDelete(id)} className="flex items-center gap-2">
                <span>Eliminar </span>
                <i className="ri-delete-bin-line text-xl"></i>
              </span>
            }
            id={`book-${id}`}
            opentext={<i className="ri-delete-bin-line text-xl"></i>}
            styles={{
              open: 'join-item',
            }}
          >
            <div className="alert alert-warning mb-4">
              <i className="ri-alert-line text-4xl"></i>
              <span>
                Estás a punto de tomar una decisión irreversible.
                <br /> Borrarás la agenda {name}
              </span>
            </div>

            <div className="flex flex-col text-base-content">
              <span className="block">
                Si eliminas este agenda, todos los contactos se volverán inaccesibles. Si mantuviste
                conversaciones particulares con alguno de ellos, podrás seguir viéndolas en la
                sección de{' '}
                <Link href="/app/chat" className="font-bold">
                  chats
                </Link>
                .
              </span>
              <span className="pt-6 pb-4 font-semibold block">
                ¿Estás seguro que quieres eliminarlo?
              </span>
            </div>
          </Modal>

          <Link href={`/app/databases/${id}`} className="btn btn-secondary w-full join-item" passHref>
            <i className="ri-eye-line text-2xl"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};
