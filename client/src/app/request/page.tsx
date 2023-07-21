import { RequestForm } from '@/components/forms/RequestForm';
import { ts } from '@/utils/translate.s';

export const metadata = {
  title: 'WAYummy - Solicitud de demo',
  description: '',
};

export default function RequestPage() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="absolute top-0 left-0 z-0 bg-gradient-animated w-full h-full"></div>
      <div className="max-w-3xl bg-base-200 px-6 pt-6 pb-2 rounded z-10">
        <h1 className="text-2xl">{ts('REQUEST_TITLE')}</h1>
        <p className="pt-2 pb-4">{ts('REQUEST_SUBTITLE')}</p>
        <RequestForm />
      </div>
    </div>
  );
}
