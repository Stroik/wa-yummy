import { Router } from 'express';
import whatsapp from './whatsapp';
import book from './book';
import campaign from './campaign';
import message from './message';
import user from './user';
import roles from './roles';
import upload from './upload';
import auth from './auth';
import chat from './chat';
import config from './config';
import request from './request';

const router = Router();

router.use('/auth', auth);
router.use('/whatsapp', whatsapp);
router.use('/book', book);
router.use('/campaign', campaign);
router.use('/message', message);
router.use('/user', user);
router.use('/roles', roles);
router.use('/upload', upload);
router.use('/chat', chat);
router.use('/config', config);
router.use('/request', request);

export default router;
