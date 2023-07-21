'use client';

import { _axios as axios } from '@/utils/_axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Modal } from '../Modal';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface UserToUpdate {
  id: string;
  name: string;
  email: string;
  roleId: string;
  image: string;
  plan: string;
}

export const getUsers = async () => {
  try {
    const response = await axios.get('/user');
    if (response.status !== 200) throw new Error('Error al obtener los usuarios');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (user: UserToUpdate) => {
  try {
    const response = await axios.put(`/user/${user.id}`, user);
    if (response.status !== 200) throw new Error('Error al actualizar el usuario');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPlans = async () => {
  try {
    const response = await axios.get('/config/plans');
    if (response.status !== 200) throw new Error('Error al obtener los planes');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const UserList = () => {
  const { status } = useSession();
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: status === 'authenticated',
  });

  const { data: planes } = useQuery({
    queryKey: ['planes'],
    queryFn: getPlans,
    enabled: status === 'authenticated',
  });

  const { mutate } = useMutation({
    mutationFn: updateUser,
  });

  const query = useQueryClient();
  const handleChange = (user: any, event: FormEvent<HTMLSelectElement>) => {
    if (user) {
      let u: UserToUpdate = {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        image: user.image,
        plan: event.currentTarget.value,
      };
      mutate(u, {
        onSuccess: (data) => {
          toast.success('Usuario actualizado correctamente');
          query.invalidateQueries(['users']);
          return;
        },
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Plan</th>
            <th>
              <span className="tooltip tooltip-bottom" data-tip="Whatsapps">
                <i className="ri-whatsapp-line text-xl"></i>
              </span>
            </th>
            <th>
              <span className="tooltip tooltip-bottom" data-tip="Campañas">
                <i className="ri-megaphone-line text-xl"></i>
              </span>
            </th>
            <th>
              <span className="tooltip tooltip-bottom" data-tip="Agendas">
                <i className="ri-book-line text-xl"></i>
              </span>
            </th>
            <th>
              <span className="tooltip tooltip-bottom" data-tip="Mensajes">
                <i className="ri-message-line text-xl"></i>
              </span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!users?.length && (
            <tr>
              <td colSpan={8} className="text-center">
                No hay usuarios, lo cual es raro...
              </td>
            </tr>
          )}

          {users?.map((user: any) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.Role.description}</td>
              <td>
                {/** Create a select to default select the current plant and update the plan when the admin decided */}
                <select
                  className="select select-bordered"
                  value={user.planId}
                  onChange={(e) => handleChange(user, e)}
                >
                  {planes?.map((plan: any) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>{user._count.Whatsapp}</td>
              <td>{user._count.Campaign}</td>
              <td>{user._count.Book}</td>
              <td>{user._count.Message}</td>
              <td>
                <div className="join">
                  <Modal
                    confirm={
                      <i
                        className="ri-delete-bin-line text-xl"
                        onClick={() => console.log(user.id)}
                      ></i>
                    }
                    id={`modal-del-${user.id}`}
                    closeText="Cancelar"
                    opentext={<i className="ri-delete-bin-line text-xl"></i>}
                    styles={{
                      open: 'join-item',
                    }}
                  >
                    <div className="alert alert-warning shadow-lg mb-4">
                      <div>
                        <i className="ri-error-warning-line"></i>
                        <span>Estás a punto de tomar una decisión irreversible</span>
                      </div>
                    </div>
                    <span className="block font-semibold">
                      ¿Estás seguro de eliminar este usuario?
                    </span>
                  </Modal>
                  {/* <Link className="btn btn-primary" href={`/admin/users/edit/${user.id}`} passHref>
                    <i className="ri-pencil-line text-xl"></i>
                  </Link> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
