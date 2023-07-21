import type { Socket } from 'socket.io';

export const connect = (socket: Socket) => {
  console.log('user connect ', socket.id);
};
