import type { Socket } from 'socket.io';

export const disconnect = (socket: Socket) => {
  console.log('user disconnected', socket.id);
  socket._cleanup();
};
