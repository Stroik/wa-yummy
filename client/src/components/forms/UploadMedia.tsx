'use client';

import { _axios as axios } from '@/utils/_axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const uploadFile = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const UploadMedia = ({ path }: { path: string }) => {
  const [filename, setFilename] = useState('');
  const nav = useRouter();

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.mp4)$/i;
    if (!allowedExtensions.exec(e.currentTarget.files?.[0].name as string)) {
      toast.error('El archivo debe ser JPG, PNG o MP4');
      setFilename('');
      e.target.value = '';
      return false;
    }
    setFilename(e.currentTarget.files?.[0].name || '');
  };

  const { mutate } = useMutation(uploadFile);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate(formData.get('file'), {
      onSuccess: (data) => {
        if (!data) return;
        if (data.status === 'ERROR') {
          toast.error(data.message);
          return;
        }

        setFilename('');
        toast.success(data.message);
        nav.push(path);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="custom-file">
        <label
          className="cursor-pointer flex w-full flex-col items-center rounded border-2 border-dashed border-green-500 bg-white dark:border-slate-100 dark:bg-zinc-700 p-6 text-center"
          htmlFor="inputGroupFile"
        >
          <i className="ri-image-line text-4xl"></i>
          {filename.length > 0 ? (
            <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide dark:text-slate-50">
              {filename}
            </h2>
          ) : (
            <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide dark:text-slate-50">
              Subir archivo multimedia
            </h2>
          )}
          <span className="mt-2 text-gray-500 tracking-wide dark:text-slate-100">
            Subí o arrastrá tus archivos <strong>JPG, PNG o MP4</strong>
          </span>
          <input
            type="file"
            name="file"
            className="hidden"
            id="inputGroupFile"
            required
            onChange={handleImport}
            accept="image/*,video/*"
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary mt-4 btn-block">
        Subir archivo
      </button>
    </form>
  );
};
