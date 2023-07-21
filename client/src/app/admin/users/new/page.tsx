import { PageHeader } from '@/components/PageHeader';
import { UserForm } from '@/components/forms/UserForm';
import { ts } from '@/utils/translate.s';

export default function UserNew({ searchParams }: any) {
  return (
    <section id="user-new">
      <PageHeader title={ts('NEW_CLIENT')} subtitle={ts('ADD_A_NEW_CLIENT')} href="/admin/users" />
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl">
          <i className="ri-user-add-line mr-2"></i>
          <span>{ts('REGISTER_FORM')}</span>
        </h2>
        <UserForm searchParams={searchParams} />
      </div>
    </section>
  );
}
