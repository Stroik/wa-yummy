import { PageHeader } from '@/components/PageHeader';
import { NewBookForm } from '@/components/forms/NewBook';
import { ts } from '@/utils/translate.s';

export default function NewBook() {
  return (
    <div className="">
      <PageHeader
        title={ts('NEW_DATABASE')}
        subtitle={ts('NEW_DATABASE_SUBTITLE')}
        href="/app/databases"
      />
      <div className="max-w-2xl mx-auto">
        <NewBookForm />
      </div>
    </div>
  );
}
