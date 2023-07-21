import { app, io } from './server';
import { connect } from './sockets/connect';
import { disconnect } from './sockets/disconnect';
import { validate } from './sockets/validate';

const port = process.env.PORT || 3001;

io.on('connection', (socket) => {
  socket.on('connect', () => connect(socket));
  socket.on('disconnect', () => disconnect(socket));
  socket.on('validate', async (data) => validate(socket, data));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
