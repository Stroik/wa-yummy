import { PageHeader } from '@/components/PageHeader';
import { UserList } from '@/components/lists/UserList';
import { ts } from '@/utils/translate.s';
import Link from 'next/link';

export const metadata = {
  title: 'WAYummy - Gestión de clientes',
  description: '',
};

export default function Users() {
  return (
    <section id="users">
      <PageHeader
        title={ts('CLIENTS')}
        subtitle={ts('MANAGE_ALL_REGISTERED_CLIENTS')}
        href="/admin/"
      >
        <Link href="/admin/users/new" className="btn btn-secondary join-item">
          {ts('NEW_CLIENT')}
        </Link>
      </PageHeader>
      <UserList />
    </section>
  );
}
