import { Router } from 'express';
import {
  addWhatsapp,
  delWhatsapp,
  getWhatsapps,
  loginWhatsapp,
  qrCode,
} from '../controllers/whatsapp.controller';

const router = Router();

router.get('/', getWhatsapps);
router.post('/', addWhatsapp);
router.post('/qr/init', qrCode);
router.post('/login', loginWhatsapp);
router.delete('/', delWhatsapp);

export default router;
