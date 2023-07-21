import { BookId } from '@/components/id/BookId';

export default async function Book({ params, searchParams }: any) {
  const id = params.id;

  return <BookId id={id} searchParams={searchParams} />;
}
