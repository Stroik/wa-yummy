'use client';

import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { PageHeader } from '../PageHeader';
import { useState } from 'react';
import { Modal } from '../Modal';
import { Loading } from '../Loading';
import { _axios as axios } from '@/utils/_axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const getCampaign = async (id: string) => {
  try {
    const response = await axios.get(`/campaign/${id}`);
    if (response.status !== 200) throw new Error('Error al obtener la campaña');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendCampaign = async (id: string) => {
  try {
    const response = await axios.post(`/campaign/${id}`);
    if (response.status !== 200) throw new Error('Error al enviar la campaña');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const CampaignId = ({ id }: { id: string }) => {
  const { status } = useSession();
  const nav = useRouter();
  const {
    data: campaign,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['campaign', id],
    queryFn: () => getCampaign(id),
    enabled: status === 'authenticated',
  });
  const { mutate } = useMutation(sendCampaign);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Enlace copiado al portapapeles');
  };

  const handleSendCampaign = async () => {
    mutate(id, {
      onSuccess: (data) => {
        console.log(data);
        if (data.status === 'ERROR') return toast.error(data.message);

        toast.success(data.message);
        nav.push(`/app/messages?page=1&pageSize=10&campaignId=${id}&status=SENT`);
        return;
      },
      onError: (data) => {
        console.log(data);
        toast.error('Error al enviar la campaña');
      },
    });
  };

  if (isLoading || isError) return <Loading full={true} />;

  return (
    <>
      <PageHeader
        title={'Campaña ' + id}
        subtitle="Envía mensajes a tus contactos"
        href="/app/campaigns"
      >
        <button className="btn btn-secondary" onClick={handleSendCampaign}>
          Enviar campaña
        </button>
      </PageHeader>
      <div className="content flex flex-col gap-2 md:flex-row">
        <div className="card bg-neutral text-neutral-content md:w-1/2">
          {campaign.mediaUrl && (
            <figure className="max-h-48 relative">
              {!campaign.mediaUrl.includes('mp4') ? (
                <Image
                  src={`${API_URL}/files/${campaign.mediaUrl}`}
                  alt="Multimedia"
                  height={500}
                  width={500}
                />
              ) : (
                <video controls preload="auto" className="object-contain">
                  <source src={`${API_URL}/files/${campaign.mediaUrl}`} type="video/mp4" />
                </video>
              )}
              <Modal
                closeText="Cerrar"
                id={`view-file`}
                opentext={
                  <span className="tooltip tooltip-left" data-tip="Visualizar">
                    <i className="ri-eye-line"></i>
                  </span>
                }
                confirm={
                  <span
                    onClick={() => {
                      copyToClipboard(
                        process.env.NEXT_PUBLIC_API_URL + '/files/' + campaign.mediaUrl
                      );
                    }}
                  >
                    Copiar link
                  </span>
                }
                styles={{
                  open: 'btn-secondary join-item absolute',
                }}
              >
                <div className="flex items-center justify-center">
                  {campaign.mediaUrl.includes('jpg') ||
                  campaign.mediaUrl.includes('png') ||
                  campaign.mediaUrl.includes('jpeg') ? (
                    <Image
                      src={process.env.NEXT_PUBLIC_API_URL + '/files/' + campaign.mediaUrl}
                      className="w-full"
                      alt="Multimedia"
                      width={500}
                      height={500}
                    />
                  ) : (
                    <video
                      src={process.env.NEXT_PUBLIC_API_URL + '/files/' + campaign.mediaUrl}
                      controls
                      className="w-full"
                    />
                  )}
                </div>
              </Modal>
            </figure>
          )}
          <div className="card-body !p-6 items-center">
            <h2 className="card-title">Mensaje</h2>
            <p>{campaign.message}</p>
          </div>
        </div>

        <div className="card bg-neutral text-neutral-content md:w-1/2">
          <div className="card-body !p-6 bg-primary text-primary-content items-center rounded-xl">
            <figure>
              <i className="ri-information-line text-4xl mr-2"></i>
              <h2 className="card-title">Información</h2>
            </figure>
            <div className="flex flex-col gap-0 text-xl">
              <p className="flex items-center gap-2">
                <span className="font-semibold">Agenda:</span>
                <span>{campaign.Book.name}</span>

                <span className="badge badge-secondary">
                  {campaign.Book._count.Contact} contactos
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Tipo de envío:</span>
                <span>{campaign.type}</span>
              </p>
              {campaign.type === 'bully' ? (
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Tiempo entre vuelta: </span>
                  <span>{campaign.timeout}</span>
                </p>
              ) : (
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Tiempo entre mensaje: </span>
                  <span>{campaign.timeout}</span>
                </p>
              )}
              <p className="flex items-center gap-2">
                <span className="font-semibold">Estado:</span>{' '}
                {campaign.status === 'CREATED' ? 'Sin enviar' : 'Enviado'}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Fecha de creación:</span>{' '}
                {new Date(campaign.createdAt).toLocaleDateString()}
              </p>

              <p className="flex items-center gap-2">
                <span className="font-semibold">Cantidad de Whatsapps:</span>{' '}
                {campaign._count.WhatsappOnCampaigns}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
