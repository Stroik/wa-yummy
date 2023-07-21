import { Router } from 'express';
import { getUserRoles } from '../controllers/user.controller';

const router = Router();

router.get('/', getUserRoles);

export default router;
