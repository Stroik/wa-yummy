'use client';
import Image from 'next/image';
import Link from 'next/link';
import { _axios as axios } from '@/utils/_axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loading } from '../Loading';
import { Modal } from '../Modal';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { handleCampaignStatus } from '@/utils/status';
import { EmptyList } from '../EmptyList';
import { tc } from '@/utils/translate';

interface ICampaign {
  id: string;
  name: string;
  description: string;
  status: string;
}

export const getCampaigns = async () => {
  try {
    const response = await axios('/campaign');
    if (response.status !== 200) throw new Error('Error getting campaign');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCampaign = async (id: string) => {
  try {
    const response = await axios.delete(`/campaign/${id}`);
    if (response.status !== 200) throw new Error('Error deleting campaign');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const CampaignList = () => {
  const { status } = useSession();
  const {
    data: campaigns,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns,
    enabled: status === 'authenticated',
  });

  if (isLoading || isError) return <Loading full={true} />;
  if (campaigns && campaigns.length === 0)
    return (
      <EmptyList
        icon="ri-megaphone-line"
        title={tc('NO_CAMPAIGNS')}
        subtitle={tc('NO_CAMPAIGNS_MSG')}
        href="/app/campaigns/new"
        btnText={tc('CREATE')}
      />
    );

  return (
    <div className="item-list">
      {campaigns.length > 0 &&
        campaigns.map((campaign: ICampaign) => <CampaignItem key={campaign.id} {...campaign} />)}
    </div>
  );
};

const CampaignItem = ({ id, name, description, status }: ICampaign) => {
  const query = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ['deleteCampaign', id],
    mutationFn: deleteCampaign,
  });

  const handleDelete = async (id: string) => {
    try {
      mutate(id, {
        onSuccess: () => {
          query.invalidateQueries(['campaigns']);
          toast.success('Campaña eliminada con éxito');
        },
        onError: () => {
          toast.error('Error eliminando campaña');
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
          alt="Campaña"
          width={300}
          height={300}
          className="object-cover w-full max-h-36 bg-primary grayscale"
        />
        <i className="ri-contacts-book-2-line text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
      </figure>
      <div className="card-body items-center text-center gap-0 ">
        <span className="text-xl">{name}</span>
        <span>{description}</span>
        <span className="badge badge-primary">{handleCampaignStatus(status)}</span>
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
                <br /> Borrarás la campaña {name}
              </span>
            </div>

            <div className="flex flex-col text-base-content">
              <span className="block">
                Si eliminas esta campaña, se eliminarán todas las estadísticas relacionadas con
                ella. No así, los mensajes enviados a los contactos.
              </span>
              <span className="pt-6 pb-4 font-semibold block">
                ¿Estás seguro que quieres eliminarla?
              </span>
            </div>
          </Modal>

          <Link
            href={`/app/campaigns/${id}`}
            className="btn btn-secondary w-full join-item"
            passHref
          >
            <i className="ri-eye-line text-2xl"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};
