import { Router } from 'express';
import {
  getContacts,
  getAllMessagesOfContact,
  sendMessage,
  addContact,
  getAllMessagesOfContactFromTo,
  sendMessageInteraction,
} from '../controllers/chat.controller';

const router = Router();

router.get('/contacts', getContacts);
router.post('/interactions', getAllMessagesOfContactFromTo);
router.post('/sendInteractions', sendMessageInteraction);
router.post('/contacts', addContact);
router.post('/messages', getAllMessagesOfContact);
router.post('/send', sendMessage);

export default router;
