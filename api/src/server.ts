import 'dotenv/config';

import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import { Server } from 'socket.io';
import { join } from 'path';

import router from './routes';
import { isAuth } from './middlewares/isAuth';

const server = express();
const app = http.createServer(server);
const whitelist = JSON.parse(process.env.WHITELIST || '[]');
const publicPath = join(__dirname, '..', '/public');
const socketUrl: string = process.env.SOCKET_URL || 'http://localhost:3000';

server.use(cors({ origin: whitelist }));
server.use(morgan('dev'));
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
server.use('/rest/files', express.static(publicPath));
server.use(isAuth);
server.use('/rest', router);

const io = new Server(app, {
  cors: {
    origin: socketUrl,
    methods: ['GET', 'POST'],
  },
});

export { app, io };
