'use client';
import { _axios as axios } from '@/utils/_axios';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { Loading } from '../Loading';
import { toast } from 'react-toastify';
import { Modal } from '../Modal';
import Image from 'next/image';
import { EmptyList } from '../EmptyList';
import { tc } from '@/utils/translate';

export const getFiles = async () => {
  try {
    const response = await axios.get('/upload');
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const FileList = () => {
  const { status, data: session } = useSession();
  const {
    data: files,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['files'],
    queryFn: getFiles,
    enabled: status === 'authenticated',
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Enlace copiado al portapapeles');
  };

  if (isLoading || status !== 'authenticated') return <Loading full />;
  if (files && files.length === 0)
    return (
      <EmptyList
        icon="ri-image-add-line"
        title={tc('NO_FILES')}
        subtitle={tc('NO_FILES_MSG')}
        href={session?.user?.role === 'admin' ? '/admin/files/upload' : '/app/files/upload'}
        btnText={tc('UPLOAD')}
      />
    );

  return (
    <div className="oveflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>{tc('NAME')}</th>
            <th>{tc('TYPE')}</th>
            <th>{tc('LINK')}</th>
            <th className="flex justify-end">{tc('ACTIONS')}</th>
          </tr>
        </thead>
        <tbody>
          {files?.map((file: any, i: number) => (
            <tr key={i}>
              <td>{file.name}</td>
              <td>{file.type}</td>
              <td>
                <span>{process.env.NEXT_PUBLIC_API_URL + '/' + file.url.join('/')}</span>
              </td>

              <td className="flex items-center justify-end">
                <div className="join">
                  <Modal
                    closeText="Cerrar"
                    id={`view-file-${i}`}
                    opentext={
                      <span className="tooltip tooltip-left" data-tip="Visualizar">
                        <i className="ri-eye-line"></i>
                      </span>
                    }
                    confirm={
                      <span
                        onClick={() => {
                          const url = process.env.NEXT_PUBLIC_API_URL + '/' + file.url.join('/');
                          copyToClipboard(url);
                        }}
                      >
                        {tc('COPY_LINK')}
                      </span>
                    }
                    styles={{
                      open: 'btn-secondary join-item',
                    }}
                  >
                    <div className="flex items-center justify-center">
                      {file.type === 'jpg' || file.type === 'png' || file.type === 'jpeg' ? (
                        <Image
                          src={process.env.NEXT_PUBLIC_API_URL + '/' + file.url.join('/')}
                          alt={file.name}
                          className="w-full"
                          width={500}
                          height={500}
                        />
                      ) : (
                        <video
                          src={process.env.NEXT_PUBLIC_API_URL + '/' + file.url.join('/')}
                          controls
                          className="w-full"
                        />
                      )}
                    </div>
                  </Modal>
                  <button
                    className="btn btn-primary join-item tooltip"
                    data-tip="Copiar enlace"
                    onClick={() =>
                      copyToClipboard(process.env.NEXT_PUBLIC_API_URL + '/' + file.url.join('/'))
                    }
                  >
                    <i className="ri-file-copy-line"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
