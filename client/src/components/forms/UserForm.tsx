'use client';

import { _axios as axios } from '@/utils/_axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { capitalize } from '../../utils/formatters';
import { useRouter } from 'next/navigation';

export const getPlans = async () => {
  try {
    const response = await axios.get('/config/plans');
    if (response.status !== 200) throw new Error('Error fetching plans');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRoles = async () => {
  try {
    const response = await axios.get('/roles');
    if (response.status !== 200) throw new Error('Error fetching roles');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createProfile = async (data: any) => {
  try {
    const response = await axios.post(`/user`, data);
    if (response.status !== 200) throw new Error('Error creating profile');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const UserForm = ({ searchParams }: any) => {
  const { data: session, status } = useSession();
  const nav = useRouter();

  const { data: plans } = useQuery({
    queryKey: ['plans'],
    queryFn: getPlans,
    enabled: status === 'authenticated',
  });

  const { data: roles } = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
    enabled: status === 'authenticated',
  });

  const { mutate } = useMutation({
    mutationKey: ['profile', session?.user?.id],
    mutationFn: (data: any) => createProfile(data),
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [form, setForm] = useState({
    name: searchParams?.name ?? '',
    email: searchParams?.email ?? '',
    image: '',
    plan: '',
    roleId: '',
    password: '',
    repassword: '',
  });

  const handleCreate = (e: any) => {
    e.preventDefault();
    if (!form.name) return toast.error('El nombre es obligatorio');
    if (form.password !== form.repassword) {
      return toast.error('Las contraseñas no coinciden');
    }
    if (!form.plan) return toast.error('El plan es obligatorio');

    const formData = {
      name: form.name,
      email: form.email,
      image: form.image,
      plan: form.plan,
      roleId: form.roleId,
      password: form.password,
    };

    mutate(formData, {
      onSuccess: (data) => {
        if (data.error) return toast.error(data.message);
        toast.success('Nuevo cliente creado');
        return nav.push('/admin/users');
      },
      onError: (error) => {
        toast.error('Error creando usuario');
        return;
      },
    });
  };

  return (
    <form className="form-control" onSubmit={handleCreate}>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div className="flex-1">
          <label className="label">
            <span className="label-text">Nombre completo</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            name="name"
            value={form.name}
            onChange={(e) => setForm((prev: any) => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div className="flex-1">
          <label className="label">
            <span className="label-text">Correo electrónico</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            autoComplete="username"
            className="input input-bordered w-full"
            value={form.email}
            onChange={(e) => setForm((prev: any) => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <div className="flex-1">
          <label className="label" htmlFor="profile-pic">
            <span className="label-text">Foto de perfil</span>
          </label>

          <input
            id="profile-pic"
            type="url"
            placeholder="Foto de perfil"
            className="input input-bordered w-full"
            name="image"
            autoComplete="url"
            value={form.image}
            onChange={(e) => setForm((prev: any) => ({ ...prev, image: e.target.value }))}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        <div className="flex-1">
          <label className="label">
            <span className="label-text">Contraseña</span>
          </label>
          <input
            type="password"
            placeholder="********"
            className="input input-bordered w-full"
            autoComplete="new-password"
            name="password"
            value={form.password}
            onChange={(e) => setForm((prev: any) => ({ ...prev, password: e.target.value }))}
          />
        </div>
        <div className="flex-1">
          <label className="label">
            <span className="label-text">Confirmar Contraseña</span>
          </label>

          <input
            type="password"
            placeholder="********"
            className="input input-bordered w-full"
            name="repassword"
            autoComplete="new-password"
            value={form.repassword}
            onChange={(e) => setForm((prev: any) => ({ ...prev, repassword: e.target.value }))}
          />
        </div>

        <div className="flex-1">
          <label className="label">
            <span className="label-text">Plan</span>
          </label>
          <select
            className="select select-bordered w-full"
            name="plan"
            value={form.plan}
            onChange={(e) => setForm((prev: any) => ({ ...prev, plan: e.target.value }))}
          >
            <option value="">Selecciona un plan</option>
            {plans?.map((plan: any) => (
              <option key={plan.id} value={plan.id}>
                {capitalize(plan.name)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="label">
            <span className="label-text">Rol</span>
          </label>
          <select
            className="select select-bordered w-full"
            name="role"
            value={form.roleId}
            onChange={(e) => setForm((prev: any) => ({ ...prev, roleId: e.target.value }))}
          >
            <option value="">Selecciona un rol</option>
            {roles?.map((role: any) => (
              <option key={role.id} value={role.id}>
                {capitalize(role.name)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="btn btn-primary btn-block mt-4">
        <span>Crear</span>
        {loading && <i className="loading loading-spinner ml-2"></i>}
      </button>
    </form>
  );
};
