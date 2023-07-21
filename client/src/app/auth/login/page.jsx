import { LoginForm } from '@/components/forms/LoginForm';
import { ts } from '@/utils/translate.s';

export const metadata = {
  title: 'WAYummy - Acceso a usuarios',
  description: '',
};

export default function Login({ searchParams }) {
  return (
    <section id="login">
      <div className="bg-gradient-animated fixed h-full w-full z-0 left-0 top-0"></div>
      <div className="flex flex-col items-center mb-4 text-neutral z-10">
        <h1 className="text-3xl">{ts('WELCOME_BACK')}</h1>
        <h2>{ts('LOGIN_WELCOME')}</h2>
      </div>
      <LoginForm searchParams={searchParams} />
    </section>
  );
}
