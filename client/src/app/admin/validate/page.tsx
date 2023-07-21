'use client';

import { read, utils, type WorkBook, writeFile } from 'xlsx';
import { useQuery } from '@tanstack/react-query';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import Image from 'next/image';
import { PageHeader } from '@/components/PageHeader';
import { socket } from '@/lib/socket';
import { getWhatsapps } from '@/components/lists/WhatsappsList';
import { Loading } from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { uniqBy } from 'lodash-es';
import { tc } from '@/utils/translate';

interface IWorkSheet {
  phone: string;
  [key: string]: string | number | undefined;
}

interface IRow {
  name: string;
  phone: string;
  info: string;
  userId?: string | number;
}

interface Database {
  phone: string;
}

interface Option {
  label: string;
  value: string;
}

export default function ValidatePage() {
  const { status } = useSession();
  const [db, setDb] = useState<Database[]>([]);
  const [validated, setValidated] = useState<Database[]>([]);
  const [dbName, setDbName] = useState('');
  const [error, setError] = useState('');
  const [validatedList, setValidatedList] = useState<Database[]>([]);
  const [failed, setFailed] = useState<any[]>([]);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isPopulating, setIsPopulating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [_alert, setAlert] = useState<string>('');
  const [validationInProgress, setValidationInProgress] = useState<boolean>(false);
  const [timeout, _setTimeout] = useState<number>(0);
  const [options, setOptions] = useState<Option[]>([]);
  const [whatsapp, setWhatsapp] = useState<Option>({ label: tc('CHOOSE_WHATSAPP'), value: '' });
  const [isValidationError, setIsValidationError] = useState<boolean>(false);
  const {
    data: whatsapps,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['whatsapps'],
    queryFn: getWhatsapps,
    enabled: status === 'authenticated',
  });

  const handleImport = ($event: FormEvent<HTMLInputElement>) => {
    const files = $event.currentTarget.files;
    setValidatedList([]);
    setFailed([]);
    setProgress(0);
    setError('');
    setAlert('');
    setValidated([]);
    if (files?.length) {
      const file = files[0];
      setDbName(file.name);
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          setIsPopulating(true);
          const wb = read(event.target.result as string);
          const sheets = wb.SheetNames;

          if (sheets.length) {
            let rows = utils.sheet_to_json(wb.Sheets[sheets[0]]) as IWorkSheet[];
            const formattedRows = rows
              .map((row) => {
                let { phone } = row;
                phone = String(phone);
                return {
                  phone: phone,
                };
              })
              .filter((row): row is IRow => row !== undefined);
            const uniques = [...new Set(formattedRows)];
            setDb(uniques);
          }
          setIsPopulating(false);
        }
      };
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => setIsPopulating(false);
    }
  };
  const timer = (s: number) => new Promise((res) => setTimeout(res, s * 1000));

  const handleSubmit = async () => {
    if (db.length && whatsapp.value) {
      setProgress(0.1);
      setIsValidating(true);
      setValidationInProgress(true);
      setAlert(tc('VALIDATION_ALERT'));
      let i = 0;
      while (db.length) {
        if (i === db.length) break;
        if (isValidationError) break;
        const phone = db[i];
        await timer(timeout);
        socket.emit('validate', { phone, whatsapp: whatsapp.value });
        setProgress(Math.round(((i + 1) / db.length) * 100));
        i++;
      }
      setIsValidating(false);
    } else {
      setError('La base de datos está vacía');
    }
    setValidationInProgress(false);
  };

  const handleExport = async () => {
    const headings = [['phone']];
    const wb: WorkBook = utils.book_new();
    const ws = utils.json_to_sheet([]);
    const mapped = validatedList.map((item: any) => item.phone);
    const data = uniqBy(mapped, 'phone');

    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');

    await writeFile(wb, tc('VALIDATED_FILE'));
  };

  useEffect(() => {
    socket.connect();

    socket.on('valid', (data) => {
      setValidatedList((prev: any) => [...prev, data]);
      setValidated((prev: any) => [...prev, data]);
      return;
    });

    socket.on('validated_error', (data) => {
      toast.error(data.message);
      setIsValidating(false);
      setValidationInProgress(false);
      setProgress(99);
      setIsValidationError(true);
      socket.disconnect();
      return;
    });

    socket.on('not_valid', (data) => {
      setFailed((prev: any) => [...prev, data]);
      setValidated((prev: any) => [...prev, data]);
      return;
    });

    const _options = whatsapps
      ?.filter((whatsapp: any) => whatsapp.status === 'READY')
      .map((whatsapp: any) => ({
        label: whatsapp.name as string,
        value: whatsapp.id as string,
      }));
    setOptions(_options);

    return () => {
      socket.disconnect();
    };
  }, [whatsapps]);

  return (
    <section id="validation">
      <PageHeader
        title={tc('VALIDATE_NUMBERS')}
        subtitle={tc('VALIDATE_NUMBERS_SUBTITLE')}
        href="/admin"
      >
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn mb-1 join-item">
            <i className="ri-information-line text-xl"></i>
          </label>
          <div
            tabIndex={0}
            className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-neutral text-primary-content"
          >
            <div className="card-body">
              <h3 className="card-title">{tc('REMEMBER')}</h3>
              <p>{tc('REMEMEBER_TEXT_1')}</p>
              <Image
                src="/validate-example.png"
                alt="Ejemplo de formato"
                width={250}
                height={150}
              />
              <p>{tc('REMEMEBER_TEXT_2')}</p>
              <p>{tc('REMEMEBER_TEXT_3')}</p>
            </div>
          </div>
        </div>
      </PageHeader>
      {progress > 0 && progress <= 100 && (
        <div className="flex items-center mb-4">
          <progress
            className="progress progress-primary w-full my-2"
            value={progress}
            max="100"
            id="progress"
          ></progress>
          <span className="ml-2">{progress}%</span>
        </div>
      )}
      {_alert.length ? (
        <div className="alert alert-warning mb-4">
          <div className="flex items-center gap-2">
            <i className="ri-information-line text-3xl"></i>
            <span>{_alert}</span>
          </div>
        </div>
      ) : null}
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
                {tc('PHONE_COUNT')} <strong>{db.length}</strong> {tc('PHONES')}
              </span>
            </>
          ) : (
            <>
              <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide dark:text-slate-50">
                {tc('UPLOAD_DATABASE')}
              </h2>
              <span className="mt-2 text-gray-500 tracking-wide dark:text-slate-100">
                {tc('UPLOAD_DATABASE_SUBTITLE')}
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
      <div className="my-4 flex items-start gap-4 w-full">
        <div className="w-1/2">
          {isLoading || !whatsapps.length ? (
            <Loading />
          ) : (
            <Select
              value={whatsapp}
              name="whatsapps"
              options={options}
              className="basic-single w-full"
              classNamePrefix="select"
              placeholder={tc('CHOOSE_WHATSAPP')}
              onChange={(e) => setWhatsapp(e as Option)}
              noOptionsMessage={(v) =>
                !v ? tc('THERE_IS_NO_WHATSAPP') : tc('THERE_IS_NO_WHATSAPP')
              }
            />
          )}
        </div>
        <div
          className="w-1/2 tooltip tooltip-primary tooltip-top "
          data-tip={tc('TIME_BETWEEN_VALIDATIONS')}
        >
          <input
            type="range"
            min={0}
            max={30}
            value={timeout}
            className="range range-primary"
            step={5}
            onChange={(e) => _setTimeout(Number(e.target.value))}
            disabled={isValidating}
          />
          <div className="w-full flex justify-between text-xs px-2">
            <span>0s</span>
            <span>5s</span>
            <span>10s</span>
            <span>15s</span>
            <span>20s</span>
            <span>25s</span>
            <span>30s</span>
          </div>
        </div>
      </div>
      {error.length > 0 && (
        <div className="alert alert-error my-4">
          <i className="ri-alert-fill text-4xl"></i>
          <span>{error}</span>
        </div>
      )}
      <button
        className="btn btn-primary btn-block my-4"
        onClick={handleSubmit}
        disabled={!db.length || validatedList.length > 0}
      >
        {isValidating || isPopulating ? (
          <>
            <span>{tc('VALIDATING')}</span>
            <i className="loading loading-dots loading-md"></i>
          </>
        ) : (
          <span>{tc('VALIDATE_NUMBERS')}</span>
        )}
      </button>

      <div className="grid grid-cols-1 gap-4 ">
        <button className="btn btn-primary btn-block" onClick={handleExport}>
          <span className="flex items-center justify-center gap-2">
            <span>{tc('EXPORT_VALIDATED_CONTACTS')}</span>
            <i className="ri-file-excel-2-line text-xl"></i>
          </span>
        </button>
        {failed.length > 0 && (
          <div className="alert alert-info">
            <i className="ri-information-line text-4xl"></i>
            <span>
              {tc('VALIDATED_MSG_1')} {uniqBy(failed, 'phone').length} {tc('VALIDATED_MSG_2')}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
