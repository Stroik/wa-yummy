'use client';

import { Modal } from '../Modal';
import { _axios as axios } from '@/utils/_axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const newWhatsapp = async (name: string) => {
  if (typeof axios.defaults.headers.common['userid'] === 'undefined') return;
  try {
    const response = await axios.post('/whatsapp', {
      name,
    });
    if (!response || response.status !== 200) {
      throw new Error('Error creating whatsapp');
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const AddWhatsapp = () => {
  const [name, setName] = useState('');
  const { mutate: add } = useMutation(newWhatsapp);
  const query = useQueryClient();

  const handleAdd = async () => {
    try {
      add(name, {
        onSuccess: (data) => {
          if (typeof data === 'undefined') {
            toast.error(
              'No tienes whatsapps disponibles. Cambia tu plan para agregar más Whatsapps'
            );
            query.invalidateQueries({
              queryKey: ['whatsapps'],
            });
            return;
          }
          if (data.status === 'OK') {
            toast.success('Whatsapp creado');
            query.invalidateQueries({
              queryKey: ['whatsapps'],
            });
            setName('');
            (window as any)['add-whatsapp']?.close();
            return;
          }
          toast.error('Error creando whatsapp');
          return;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      opentext="Agregar"
      confirm={
        <span onClick={handleAdd}>
          <span>Crear </span>
        </span>
      }
      id="add-whatsapp"
      closeText="Cancelar"
      styles={{
        open: 'join-item',
      }}
    >
      <div className="form-control">
        <label className="label">
          <span className="label-text">Escribe un nombre para identificar tu whatsapp</span>
        </label>
        <label className="input-group input-group-md">
          <span>Nombre</span>
          <input
            type="text"
            placeholder="Whatsapp 01"
            className="input input-bordered input-md w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
    </Modal>
  );
};
