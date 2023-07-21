import { Router } from 'express';
import { getMessages, validate } from '../controllers/message.controller';

const router = Router();

router.get('/', getMessages);
router.post('/validate', validate);

export default router;
