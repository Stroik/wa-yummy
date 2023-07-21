import { RequestId } from '@/components/id/RequestId';

export default function RequestDetail({ params }: any) {
  const id = params.id;
  return <RequestId id={id} />;
}
