'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { getFiles } from '../lists/FileList';
import { getWhatsapps } from '../lists/WhatsappsList';
import { getBooks } from '../lists/BookList';
import { getContact } from '../id/BookId';
import { Modal } from '../Modal';
import { toast } from 'react-toastify';
import { _axios as axios } from '@/utils/_axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Campaign {
  name: string;
  description: string;
  bookId: string;
  mediaUrl: string;
  type: string;
  timeout: number;
  whatsappIds: string[];
  message: string;
}

interface Book {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  available: boolean;
  _count: Count;
}

interface Count {
  Contact: number;
}

interface BookProps {
  campaign: Campaign;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
  status: string;
}

interface WhatsappCheckboxProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
  status: string;
}

interface MessageWithVarsProps {
  vars: string[];
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const newCampaign = async (campaign: Campaign) => {
  try {
    const response = await axios.post('/campaign', campaign);
    if (response.status !== 200) throw new Error('Error al crear la campaña');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const AddCampaign = () => {
  const nav = useRouter();
  const { status } = useSession();
  const [campaign, setCampaign] = useState<Campaign>({
    name: '',
    description: '',
    bookId: '',
    mediaUrl: '',
    type: 'bully',
    timeout: 0,
    whatsappIds: [],
    message: '',
  });
  const [vars, setVars] = useState<any[]>([]);

  const { mutate } = useMutation(newCampaign);

  const handleSubmit = () => {
    if (campaign.name.length === 0) return toast.error('El nombre de la campaña es obligatorio');
    if (campaign.description.length === 0)
      return toast.error('La descripción de la campaña es obligatoria');
    if (campaign.bookId.length === 0) return toast.error('La agenda es obligatoria');
    if (campaign.whatsappIds.length === 0)
      return toast.error('Debes seleccionar al menos un whatsapp');
    if (campaign.message.length === 0) return toast.error('El mensaje es obligatorio');
    if (campaign.type.length === 0) return toast.error('El tipo de campaña es obligatorio');

    mutate(campaign, {
      onSuccess: (data) => {
        if (data) {
          toast.success(data.message);
          nav.push('/app/campaigns');
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error('Error al crear la campaña');
      },
    });
  };

  useEffect(() => {
    if (campaign.bookId.length > 0) {
      getContact(campaign.bookId, '').then((data) => {
        if (data) {
          const contacts = data.book.Contact;
          const info = contacts.map((c: any) => JSON.parse(c.info));
          const infoKeys = new Set(...info.map((i: any) => Object.keys(i)));
          const infoKeysArray = Array.from(infoKeys);
          infoKeysArray.push('name');
          setVars(infoKeysArray);
        }
      });
    }
  }, [campaign.bookId]);

  return (
    <div className="form-control w-full gap-4">
      <div className="flex flex-col gap-3 items-center lg:flex-row">
        <label className="join">
          <span className="join-item btn">Nombre</span>
          <input
            type="text"
            className="input input-bordered w-full join-item"
            name="name"
            value={campaign.name}
            onChange={(e) => setCampaign((prev: Campaign) => ({ ...prev, name: e.target?.value }))}
          />
        </label>

        <label className="join">
          <span className="join-item btn">Descripción</span>
          <input
            type="text"
            className="input input-bordered w-full join-item"
            name="description"
            value={campaign.description}
            onChange={(e) =>
              setCampaign((prev: Campaign) => ({ ...prev, description: e.target?.value }))
            }
          />
        </label>

        <BookSelect campaign={campaign} setCampaign={setCampaign} status={status} />
      </div>

      <div className="flex flex-col gap-3 items-center lg:flex-row">
        <FileSelect campaign={campaign} setCampaign={setCampaign} status={status} />
        <label className="join w-full">
          <span className="btn join-item">Tipo</span>
          <select
            className="select select-bordered flex-1 join-item"
            name="type"
            value={campaign.type}
            onChange={(e) => setCampaign((prev: Campaign) => ({ ...prev, type: e.target.value }))}
          >
            <option disabled>Forma en que se realizará el envío</option>
            <option value="sequential">Secuencial</option>
            <option value="bully">Bully</option>
          </select>
        </label>
      </div>

      <div>
        <label className="label">
          <span className="label-text">Tiempo de espera entre mensajes</span>
        </label>
        <label>
          <input
            type="range"
            min="0"
            max="120"
            className="range range-primary"
            step="30"
            name="timeout"
            value={campaign.timeout}
            onChange={(e) =>
              setCampaign((prev: Campaign) => ({ ...prev, timeout: parseInt(e.target.value) }))
            }
          />
          <div className="w-full flex justify-between text-xs px-2">
            <span>0s</span>
            <span>30s</span>
            <span>60s</span>
            <span>90s</span>
            <span>120s</span>
          </div>
        </label>
      </div>

      <div>
        <WhatsappCheckbox campaign={campaign} setCampaign={setCampaign} status={status} />
      </div>

      <div>
        <MessageWithVars vars={vars} campaign={campaign} setCampaign={setCampaign} />
      </div>

      <div className="my-4">
        <button className="btn btn-primary btn-block" onClick={handleSubmit}>
          Crear
        </button>
      </div>
    </div>
  );
};

const BookSelect = ({ campaign, setCampaign, status }: BookProps) => {
  const { data: books } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    enabled: status === 'authenticated',
  });

  return (
    <label className="join flex-1">
      <span className="join-item btn">Agenda</span>
      <select
        className="select select-bordered flex-1 join-item"
        name="bookId"
        value={campaign.bookId}
        onChange={(e) => setCampaign((prev: Book) => ({ ...prev, bookId: e.target.value }))}
      >
        <option value="">Seleccionar agenda</option>
        {books?.map((option: any) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
};

const FileSelect = ({ campaign, setCampaign, status }: BookProps) => {
  const { data: files } = useQuery({
    queryKey: ['files'],
    queryFn: getFiles,
    enabled: status === 'authenticated',
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Enlace copiado al portapapeles');
  };

  const nav = useRouter();

  const handleChangeMultimedia = (e: FormEvent<HTMLSelectElement>) => {
    if (e.currentTarget?.value === 'subir') return nav.push(`/app/files/upload`);
    setCampaign((prev: Book) => ({ ...prev, mediaUrl: e.currentTarget?.value }));
    return;
  };

  return (
    <>
      <label className="join w-full">
        <span className="btn join-item">Multimedia</span>
        <select
          className="select select-bordered flex-1 join-item"
          name="mediaUrl"
          value={campaign.mediaUrl}
          onChange={(e) => handleChangeMultimedia(e)}
        >
          <option value="">Sin multimedia</option>
          {files?.map((option: any, i: number) => {
            const id = option.url[1];
            return (
              <option key={i} value={id}>
                {option.name}
              </option>
            );
          })}
          <option value="subir" className="bg-primary text-xl">
            Subir archivo
          </option>
        </select>
      </label>
      {campaign.mediaUrl && (
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
                copyToClipboard(process.env.NEXT_PUBLIC_API_URL + '/files/' + campaign.mediaUrl);
              }}
            >
              Copiar link
            </span>
          }
          styles={{
            open: 'btn-secondary join-item',
          }}
        >
          <div className="flex items-center justify-center">
            {campaign.mediaUrl.includes('jpg') ||
            campaign.mediaUrl.includes('png') ||
            campaign.mediaUrl.includes('jpeg') ? (
              <Image
                src={process.env.NEXT_PUBLIC_API_URL + '/files/' + campaign.mediaUrl}
                className="w-full"
                alt="Imagen de la campaña"
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
      )}
    </>
  );
};

const WhatsappCheckbox = ({ campaign, setCampaign, status }: WhatsappCheckboxProps) => {
  const { data: whatsapps } = useQuery({
    queryKey: ['whatsapps'],
    queryFn: getWhatsapps,
    enabled: status === 'authenticated',
  });

  const handleChange = (id: string) => {
    if (campaign.whatsappIds.includes(id)) {
      setCampaign((prev: any) => ({
        ...prev,
        whatsappIds: prev.whatsappIds.filter((item: any) => item !== id),
      }));
    } else {
      setCampaign((prev: any) => ({ ...prev, whatsappIds: [...prev.whatsappIds, id] }));
    }
  };

  return (
    <>
      <label className="label">
        <span className="label-text">Whatsapp que realizarán los envíos</span>
      </label>
      <div className="flex gap-2 overflow-x-auto py-4">
        {whatsapps?.map((item: any) => (
          <label
            key={item.id}
            className="rounded-md border border-primary p-2 flex gap-2 justify-between items-center"
          >
            <span className="flex items-center gap-1">
              <i className="ri-whatsapp-line text-xl text-primary"></i>
              <span>{item.name}</span>
            </span>
            <input
              type="checkbox"
              value={item.id}
              onChange={() => handleChange(item.id)}
              id={item.id}
              className="checkbox checkbox-primary"
            />
          </label>
        ))}
      </div>
    </>
  );
};

const MessageWithVars = ({ vars, campaign, setCampaign }: MessageWithVarsProps) => {
  return (
    <>
      <label className="label">
        <span className="label-text">Mensaje a enviar</span>
        <span
          className="label-text-alt tooltip tooltip-left"
          data-tip="Haz click en las variables para agregarlas al mensaje"
        >
          <i className="ri-information-line text-primary text-2xl"></i>
        </span>
      </label>
      <textarea
        className="textarea textarea-bordered w-full"
        onChange={(e) => setCampaign((prev: any) => ({ ...prev, message: e.target.value }))}
        value={campaign.message}
      ></textarea>
      <div className="flex flex-wrap gap-2 mt-2">
        {vars.map((variable, i) => (
          <span
            key={i}
            className="btn btn-outline btn-xs"
            onClick={() =>
              setCampaign((prev: any) => ({
                ...prev,
                message: prev.message + ' ${' + variable + '}',
              }))
            }
          >
            {variable}
          </span>
        ))}
      </div>
    </>
  );
};
