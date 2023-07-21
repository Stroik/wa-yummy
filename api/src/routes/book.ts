import { Router } from 'express';
import {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  addContacts,
  deleteContacts,
} from '../controllers/book.controller';

const router = Router();

router.get('/', getBooks);
router.get('/:id', getBook);
router.put('/:id', addContacts);
router.post('/new', createBook);
router.delete('/delete', deleteBook);
router.delete('/contacts/delete', deleteContacts);

export default router;
