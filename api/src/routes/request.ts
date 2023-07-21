import { Router } from 'express';
import { createRequest, getRequests, getRequest } from '../controllers/request.controller';

const router = Router();

router.post('/', createRequest);
router.get('/', getRequests);
router.get('/:id', getRequest);

export default router;
