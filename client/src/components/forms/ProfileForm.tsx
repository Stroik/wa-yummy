'use client';

import { _axios as axios } from '@/utils/_axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const getProfile = async (id: string) => {
  try {
    const response = await axios.get(`/user/${id}`);
    if (response.status !== 200) throw new Error('Error fetching profile');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPlans = async () => {
  try {
    const response = await axios.get('/config/plans');
    if (response.status !== 200) throw new Error('Error fetching plans');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (id: string, data: any) => {
  try {
    const response = await axios.put(`/user/${id}`, data);
    if (response.status !== 200) throw new Error('Error updating profile');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const ProfileForm = () => {
  const { data: session, status } = useSession();
  const { data: profile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: () => getProfile(session?.user?.id as string),
    enabled: status === 'authenticated',
  });

  const { data: plans } = useQuery({
    queryKey: ['plans'],
    queryFn: getPlans,
    enabled: status === 'authenticated',
  });

  const { mutate } = useMutation({
    mutationKey: ['profile', session?.user?.id],
    mutationFn: (data: any) => updateProfile(session?.user?.id as string, data),
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    image: '',
    plan: '',
    role: '',
    password: '',
    repassword: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdate = (e: any) => {
    e.preventDefault();
    if (!form.name) return toast.error('El nombre es obligatorio');
    if (form.password !== form.repassword) {
      return toast.error('Las contraseñas no coinciden');
    }

    const formData = {
      name: form.name,
      email: form.email,
      image: form.image,
      plan: form.plan,
      password: form.password,
    };

    mutate(formData, {
      onSuccess: (data) => {
        toast.success('Perfil actualizado');
        return;
      },
      onError: (error) => {
        toast.error('Error actualizando perfil');
        return;
      },
    });
  };

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name,
        email: profile.email,
        image: profile.image,
        plan: profile?.Plan?.id ?? '',
        role: profile?.Role?.name ?? '',
        password: '',
        repassword: '',
      });
    }
  }, [profile]);
  return (
    <form className="form-control" onSubmit={handleUpdate}>
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
            defaultValue={form.name}
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
            defaultValue={form.email}
            disabled
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
            defaultValue={form.image}
            onChange={(e) => setForm((prev: any) => ({ ...prev, image: e.target.value }))}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div className="flex-1">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            autoComplete="new-password"
            name="password"
            value={form.password}
            onChange={(e) => setForm((prev: any) => ({ ...prev, password: e.target.value }))}
          />
        </div>
        <div className="flex-1">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>

          <input
            type="password"
            placeholder="Confirm Password"
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
            onChange={(e) => {
              if (form.role === 'admin') {
                setForm((prev: any) => ({ ...prev, plan: e.target.value }));
              } else {
                return;
              }
            }}
            disabled={form.role !== 'admin'}
          >
            <option value="">Selecciona un plan</option>
            {plans?.map((plan: any) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="btn btn-primary btn-block mt-4">
        <span>Actualizar</span>
        {loading && <i className="loading loading-spinner ml-2"></i>}
      </button>
    </form>
  );
};
