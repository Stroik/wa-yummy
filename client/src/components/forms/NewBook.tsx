'use client';

import { useState, FormEvent } from 'react';
import { read, utils } from 'xlsx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { _axios as axios } from '@/utils/_axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface IWorkSheet {
  phone: string;
  name?: string;
  nombre?: string;
  [key: string]: string | number | undefined;
}

interface IRow {
  name: string;
  phone: string;
  info: string;
  userId?: string | number;
}

const createBook = async (data: any) => {
  if (typeof axios.defaults.headers.common['userid'] === 'undefined') return;
  try {
    const response = await axios.post('/book/new', data);
    if (response.status !== 200) throw new Error('Error creating book');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const NewBookForm = () => {
  const [db, setDb] = useState([]);
  const [dbName, setDbName] = useState('');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const { mutate } = useMutation(createBook);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    let { file, ...rest } = data as any;
    data = { ...rest, contacts: db, userId: session?.user?.id ?? '' };

    if (!data.name) return setError('El nombre de la agenda es obligatorio');
    if (!data.description) return setError('La descripción de la agenda es obligatoria');
    if (!db.length) return setError('La agenda debe tener al menos un contacto');

    try {
      setLoading(true);
      mutate(data, {
        onSuccess: (data) => {
          if (data.data.status === 'ERROR') return toast.error(data.data.message);
          toast.success(data.data.message);
          setLoading(false);
          router.push(`/app/databases/${data.data.id}`);
        },
        onError: (data) => {
          console.log(data);
          toast.error('Error al crear la agenda');
          setLoading(false);
        },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleImport = ($event: FormEvent<HTMLInputElement>) => {
    const files = $event.currentTarget.files;
    if (files?.length) {
      const file = files[0];
      setDbName(file.name);
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          const wb = read(event.target.result as string);
          const sheets = wb.SheetNames;

          if (sheets.length) {
            let rows = utils.sheet_to_json(wb.Sheets[sheets[0]]) as IWorkSheet[];
            const formattedRows = rows
              .map((row) => {
                let { phone, name, nombre, ...rest } = row;
                phone = String(phone);
                if (phone.substr(0, 3) !== '549') {
                  setError(`No se validaron algunos contactos por no tener el prefijo 549`);
                  return;
                }

                return {
                  name: name || nombre || '',
                  phone: phone,
                  info: Object.keys(rest).length === 0 ? '' : JSON.stringify(rest),
                  userId: session?.user?.id,
                } as IRow;
              })
              .filter((row): row is IRow => row !== undefined);
            setDb(formattedRows as any);
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-control w-full gap-4">
      <div>
        <label className="label">
          <span className="label-text">Nombre de la agenda</span>
        </label>
        <input
          type="text"
          placeholder="Merlo - Libertad"
          className="input input-bordered w-full"
          name="name"
          autoComplete="off"
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text">Descripción</span>
        </label>
        <input
          type="text"
          placeholder="Para envío del 17-06-2023"
          className="input input-bordered w-full"
          name="description"
          autoComplete="off"
        />
      </div>
      <div className="mb-4">
        <div className="custom-file">
          <label
            className="cursor-pointer flex w-full flex-col items-center rounded border-2 border-dashed border-green-500 bg-white dark:border-slate-100 dark:bg-zinc-700 p-6 text-center"
            htmlFor="inputGroupFile"
          >
            <i className="ri-file-excel-2-line text-4xl"></i>
            {dbName ? (
              <>
                <h2 className="mt-4 text-xl font-medium text-gray-700 dark:text-slate-50 tracking-wide">
                  {dbName}
                </h2>
                <span className="mt-2 text-gray-500 tracking-wide dark:text-slate-100">
                  Se han detectado un total de <strong>{db.length}</strong> contactos
                </span>
              </>
            ) : (
              <>
                <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide dark:text-slate-50">
                  Subir base de datos
                </h2>
                <span className="mt-2 text-gray-500 tracking-wide dark:text-slate-100">
                  Subí o arrastrá tus archivos <strong>XLS, XLSX o CSV</strong>
                </span>
              </>
            )}
            <input
              type="file"
              name="file"
              className="hidden"
              id="inputGroupFile"
              required
              onChange={handleImport}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </label>
        </div>
      </div>
      {error.length > 0 && (
        <div className="alert alert-error">
          <i className="ri-alert-fill text-4xl"></i>
          <span>{error}</span>
        </div>
      )}
      <div className="mb-4 flex">
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={!db.length || disabled}
        >
          <span>Crear agenda</span>
          {loading && <i className="loading loading-spinner ml-2"></i>}
        </button>
      </div>
    </form>
  );
};
