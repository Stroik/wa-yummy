'use client';
import { _axios as axios } from '@/utils/_axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { Loading } from '../Loading';
import { Modal } from '../Modal';
import { handleStatus } from '@/utils/status';
import { QRCodeSVG } from 'qrcode.react';
import { useSession } from 'next-auth/react';
import { EmptyList } from '../EmptyList';
import { tc } from '@/utils/translate';

interface WhatsappCardProps {
  whatsapp: {
    id: string;
    name: string;
    status: string;
    qr?: string;
    phone?: string;
  };
}

export const getWhatsapps = async () => {
  if (typeof axios.defaults.headers.common['userid'] === 'undefined') return;
  try {
    const response = await axios('/whatsapp');
    if (!response || response.status !== 200) {
      throw new Error('Error getting whatsapps');
    }
    const { data } = response;
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteWhatsapp = async (id: string) => {
  if (typeof axios.defaults.headers.common['userid'] === 'undefined') return;
  try {
    const response = await axios.delete(`/whatsapp`, {
      data: { id },
    });
    if (!response || response.status !== 200) {
      throw new Error('Error deleting whatsapp');
    }
    const { data } = response;
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const registerWhatsapp = async (id: string) => {
  if (typeof axios.defaults.headers.common['userid'] === 'undefined') return;
  try {
    const response = await axios.post(`/whatsapp/login`, {
      id,
    });
    if (!response || response.status !== 200) {
      throw new Error('Error registering whatsapp');
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getWhatsappQr = async (id: string) => {
  if (typeof axios.defaults.headers.common['userid'] === 'undefined') return;
  try {
    const response = await axios.get(`/whatsapp/qr/${id}`);
    if (!response || response.status !== 200) {
      throw new Error('Error getting whatsapp qr');
    }
    const { data } = response;
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const WhatsappsList = () => {
  const { status } = useSession();
  const {
    data: whatsapps,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['whatsapps'],
    queryFn: getWhatsapps,
    enabled: status === 'authenticated',
  });

  if (isLoading || status !== 'authenticated') return <Loading full={true} />;
  if (whatsapps && whatsapps.length === 0)
    return (
      <EmptyList
        icon="ri-whatsapp-line"
        title={tc('NO_WHATSAPPS')}
        subtitle={tc('NO_WHATSAPPS_MSG')}
        href="/app/whatsapps/new"
      />
    );

  return (
    <div className="whatsapp-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {whatsapps?.map((whatsapp: any) => (
        <WhatsappCard key={whatsapp.id} whatsapp={whatsapp} />
      ))}
    </div>
  );
};

export const WhatsappCard = ({ whatsapp }: WhatsappCardProps) => {
  const { mutate: del } = useMutation(deleteWhatsapp);
  const { mutate: register } = useMutation(registerWhatsapp);
  const query = useQueryClient();

  const handleDelete = async (id: string) => {
    try {
      del(id, {
        onSuccess: () => {
          query.invalidateQueries({
            queryKey: ['whatsapps'],
          });
          toast.success('Whatsapp eliminado');
        },
        onError: (error) => {
          console.error(error);
          throw new Error('Error deleting whatsapp');
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (id: string) => {
    try {
      register(id, {
        onSuccess: (res) => {
          query.invalidateQueries({
            queryKey: ['whatsapps'],
          });

          toast.success(res?.data.message);
        },
        onError: (error) => {
          console.error(error);
          toast.error('Error registrando whatsapp');
          throw new Error('Error registering whatsapp');
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card bg-neutral-focus text-neutral-content">
      <figure className="relative">
        <Image
          src="/card-bg.png"
          alt="Avatar"
          width={300}
          height={300}
          className="object-cover w-full max-h-36 bg-primary grayscale"
          priority={true}
        />
        <i className="ri-whatsapp-line text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
      </figure>
      <div className="card-body items-center text-center gap-0">
        <h3 className="text-xl">{whatsapp.name}</h3>
        <h4>{whatsapp.phone ? String(whatsapp.phone).split('@')[0] : null}</h4>
        <span className="badge badge-primary">{handleStatus(whatsapp.status)}</span>
      </div>
      <div className="card-actions">
        <div className="grid grid-cols-2 join justify-center w-full p-2">
          <Modal
            closeText="Cancelar"
            confirm={
              <span onClick={() => handleDelete(whatsapp.id)}>
                <span>Eliminar </span>
                <i className="ri-delete-bin-line text-xl"></i>
              </span>
            }
            id={`whatsapp-modal-${whatsapp.id}`}
            opentext={<i className="ri-delete-bin-line text-xl"></i>}
            styles={{
              open: 'join-item',
            }}
          >
            <div className="alert alert-warning mb-4">
              <i className="ri-alert-line text-4xl"></i>
              <span>Estás a punto de tomar una decisión irreversible.</span>
            </div>

            <div className="flex flex-col text-base-content">
              <span className="block">
                Si eliminas este whatsapp, borrarás la sesión y dejará de estar vinculado con la
                aplicación. Ya no podrás realizar envíos ni generar interacciones con este número.
              </span>
              <span className="pt-6 pb-4 font-semibold block">
                ¿Estás seguro que quieres eliminarlo?
              </span>
            </div>
          </Modal>

          {whatsapp.status === 'LOGOUT' ? (
            <button
              className="btn btn-primary tooltip w-full join-item"
              data-tip="Iniciar sesión"
              onClick={() => handleRegister(whatsapp.id)}
            >
              <i className="ri-login-box-line text-xl"></i>
            </button>
          ) : null}

          {whatsapp.status === 'READY' ? (
            <button className="btn btn-primary tooltip w-full join-item" data-tip="Sesión iniciada">
              <i className="ri-check-line text-xl"></i>
            </button>
          ) : null}

          {whatsapp.status === 'INITIALIZING' ? (
            <button
              className="btn btn-primary tooltip w-full join-item"
              data-tip="Iniciando sesión"
            >
              <i className="loading loading-spinner"></i>
            </button>
          ) : null}

          {whatsapp.status !== 'LOGOUT' &&
          whatsapp.status !== 'READY' &&
          whatsapp.status === 'QR_SENT' ? (
            <Modal
              closeText="Cancelar"
              id={`qr-${whatsapp.id}`}
              opentext={<i className="ri-qr-code-line text-xl"></i>}
              confirm={<>Aceptar</>}
              styles={{
                open: 'join-item',
              }}
            >
              <div className="w-full flex flex-col items-center justify-center text-base-content">
                {whatsapp.qr ? (
                  <div className="rounded-md">
                    <QRCodeSVG value={whatsapp.qr} size={300} includeMargin={true} />
                  </div>
                ) : null}
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    </div>
  );
};
