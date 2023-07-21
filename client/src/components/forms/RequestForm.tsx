'use client';

import { FormEvent, useEffect, useState } from 'react';
import { loadCaptchaEnginge, validateCaptcha, LoadCanvasTemplate } from 'react-simple-captcha';

import { _axios as axios } from '@/utils/_axios';
import { tc } from '@/utils/translate';

export const RequestForm = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [errors, setErrors] = useState<string[]>([]);
  const [sending, setSending] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validate = (data: any) => {
    let errors = [];
    if (!data.firstname) errors.push('El nombre es obligatorio');
    if (!data.lastname) errors.push('El apellido es obligatorio');
    if (!data.email) errors.push('El correo electrónico es obligatorio');
    if (data.email !== data.reemail) errors.push('Los correos electrónicos deben coincidir');
    if (!data.phone) errors.push('El celular es obligatorio');
    if (validateCaptcha(data.captcha) === false) {
      errors.push('El captcha es incorrecto');
    }
    setErrors(errors);
    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    let errors = validate(data);
    if (errors.length) {
      setSending(false);
      return;
    }

    try {
      const response = await axios.post('/request', data);
      if (response.status !== 200) throw new Error('Error al enviar la solicitud');

      setSuccessMessage('Solicitud enviada. ¡Muchas gracias!');
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) form.reset();
      setSending(false);
      return;
    } catch (error) {
      setSuccessMessage('Error al enviar la solicitud');
      setSending(false);
      return;
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6, '#1e1e1e', '#FAFAFA');
  }, []);

  return (
    <form id="request-form" className="py-4 w-full" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex-1">
          <label className="label">
            <span className="label-text">{tc('FIRSTNAME')}</span>
          </label>
          <input
            type="text"
            placeholder={tc('FIRSTNAME')}
            className="input input-bordered w-full"
            name="firstname"
          />
        </div>
        <div className="flex-1">
          <label className="label">
            <span className="label-text">{tc('LASTNAME')}</span>
          </label>
          <input
            type="text"
            placeholder={tc('LASTNAME')}
            className="input input-bordered w-full"
            name="lastname"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex-1">
          <label className="label">
            <span className="label-text">{tc('EMAIL_ADDRESS')}</span>
          </label>
          <input
            type="email"
            placeholder="juan@gmail.com"
            className="input input-bordered w-full"
            name="email"
          />
        </div>
        <div className="flex-1">
          <label className="label">
            <span className="label-text">{tc('EMAIL_ADDRESS')}</span>
          </label>
          <input
            type="email"
            placeholder="juan@gmail.com"
            className="input input-bordered w-full"
            name="reemail"
          />
        </div>
      </div>
      <div className="flex-1">
        <label className="label">
          <span className="label-text">{tc('PHONE_NUMBER')}</span>
        </label>
        <input
          type="text"
          placeholder="555-555"
          className="input input-bordered w-full"
          name="phone"
        />
      </div>
      <div className="flex-1">
        <label className="label">
          <span className="label-text">{tc('COMPANY')}</span>
        </label>
        <input
          type="text"
          placeholder="The Company S.A"
          className="input input-bordered w-full"
          name="business"
        />
      </div>
      <div className="flex-1 mt-4">
        <label
          htmlFor="message"
          className="flex flex-col gap-2 font-bold text-zinc-900 dark:text-slate-200"
        >
          <span>{tc('FORM_MESSAGE')}</span>
          <textarea
            name="message"
            id="message"
            rows={5}
            className="w-full textarea textarea-bordered"
            placeholder={tc('FORM_MESSAGE')}
          ></textarea>
        </label>
      </div>
      <label
        htmlFor="captcha"
        className="flex flex-col gap-2 font-bold text-zinc-900 dark:text-slate-200 mt-4"
      >
        <div className="flex-1">
          <label className="label">
            <span className="label-text">{tc('CAPTCHA')}</span>
          </label>
          <input type="text" className="input input-bordered w-full" name="captcha" />
        </div>
        <LoadCanvasTemplate reloadText={tc('REFRESH_CAPTCHA')} reloadColor="#0284c7" className="rounded-md" />
      </label>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-4 flex flex-col gap-2 ">
          <span>{successMessage}</span>
        </div>
      )}
      {errors.length > 0 && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4 flex flex-col gap-2 "
          role="alert"
        >
          {errors.map((error, index) => (
            <span key={index} className="w-full flex items-center gap-2">
              <i className="ri-error-warning-fill text-2xl"></i>
              <span>{error}</span>
            </span>
          ))}
        </div>
      )}
      <div className="flex justify-end pt-4">
        <button type="submit" className="btn btn-secondary">
          <span>{tc('SEND_REQUEST')}</span>
          {sending && <i className="loading loading-spinner" />}
        </button>
      </div>
    </form>
  );
};
