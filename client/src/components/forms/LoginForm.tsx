'use client';

import { signIn } from 'next-auth/react';
import { FormEvent, useEffect, useState } from 'react';
import { tc } from '@/utils/translate';

interface ISearchParams {
  [key: string]: string;
}

interface Props {
  searchParams?: ISearchParams;
}

const KNOWN_ERRORS: ISearchParams = {
  OAuthSignin:
    'Hubo un error al intentar iniciar sesión con OAuth. Por favor, inténtalo nuevamente más tarde.',
  OAuthCallback:
    'Ocurrió un error al procesar la respuesta del proveedor de OAuth. Por favor, intenta nuevamente más tarde.',
  OAuthCreateAccount:
    'No se pudo crear la cuenta de usuario del proveedor de OAuth. Por favor, intenta registrarte de otra manera.',
  EmailCreateAccount:
    'No se pudo crear la cuenta de usuario con el proveedor de correo electrónico. Por favor, intenta registrarte de otra manera.',
  Callback:
    'Ocurrió un error en el proceso de autenticación. Por favor, intenta nuevamente más tarde.',
  OAuthAccountNotLinked:
    'La dirección de correo electrónico asociada a esta cuenta ya está vinculada a otro proveedor. Por favor, inicia sesión con el proveedor correcto.',
  EmailSignin:
    'Ocurrió un error al enviar el correo electrónico con el código de verificación. Por favor, intenta nuevamente más tarde.',
  CredentialsSignin:
    'La información de inicio de sesión proporcionada es incorrecta. Por favor, verifica tus credenciales e intenta nuevamente.',
  SessionRequired:
    'Para acceder a este contenido, debes iniciar sesión en todo momento. Por favor, inicia sesión para continuar.',
  Default: 'Se produjo un error desconocido. Por favor, inténtalo nuevamente más tarde.',
};

export const LoginForm = ({ searchParams }: Props) => {
  const [callbackUrl] = useState<string>(searchParams?.callbackUrl || '');
  const [error, setError] = useState<string>(searchParams?.error || '');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    if (email && password) {
      signIn('credentials', {
        email,
        password,
        callbackUrl: callbackUrl || '/app/dashboard',
      });
      return;
    }
  };

  useEffect(() => {
    if (error) {
      setError(KNOWN_ERRORS[error] || KNOWN_ERRORS.Default);
      setLoading(false);
    }
  }, []);

  return (
    <form className="form-control p-8 shadow-md bg-neutral-content gap-4 max-w-xs z-10" onSubmit={handleSubmit}>
      <div>
        <label className="label">
          <span className="label-text text-neutral-focus">{tc('EMAIL')}</span>
        </label>
        <input
          className="input input-bordered join-item w-full"
          placeholder={tc('EMAIL')}
          type="email"
          name="email"
          autoComplete="email"
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text text-neutral-focus">{tc('PASSWORD')}</span>
        </label>
        <input
          className="input input-bordered join-item w-full"
          type="password"
          name="password"
          placeholder={tc('PASSWORD')}
          autoComplete="current-password"
        />
      </div>

      {error && (
        <div className="alert alert-error max-w-xs">
          <i className="ri-error-warning-line text-xl"></i>
          <span>{error}</span>
        </div>
      )}
      <button className="btn btn-secondary btn-block">
        <span>{tc('LOGIN')}</span>
        {loading && <i className="ri-loader-4-line animate-spin ml-2"></i>}
      </button>
    </form>
  );
};
