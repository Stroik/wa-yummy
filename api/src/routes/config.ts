import { Router } from 'express';
import { getPlans, setConfig } from '../controllers/config.controller';

const router = Router();

router.post('/', setConfig);
router.get('/plans', getPlans);

export default router;
