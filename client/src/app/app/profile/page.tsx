import { PageHeader } from '@/components/PageHeader';
import { ThemeSelector } from '@/components/ThemeSelector';
import { ProfileForm } from '@/components/forms/ProfileForm';

export const metadata = {
  title: 'WAYummy - Configuración de perfil',
  description: '',
};

export default function Profile() {
  return (
    <section id="profile">
      <PageHeader
        title="Perfil"
        subtitle="Ajustes y configuraciones de la cuenta"
        href="/app/dashboard"
      />

      <div id="profile-form">
        <h2 className="text-2xl py-4">
          <i className="ri-user-line"></i> Información de la cuenta
        </h2>
        <ProfileForm />
      </div>

      <div id="app-details">
        <h2 className="text-2xl py-4">
          <i className="ri-paint-line"></i> Apariencia de la aplicación
        </h2>
      </div>
      <ThemeSelector />
    </section>
  );
}
