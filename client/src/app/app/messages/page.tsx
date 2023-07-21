import { MessageList } from '@/components/lists/MessageList';

export const metadata = {
  title: 'WAYummy - Mensajes',
  description: '',
};

export default function Messages({ searchParams }: any) {
  return (
    <section id="messages">
      <MessageList searchParams={searchParams} />
    </section>
  );
}
