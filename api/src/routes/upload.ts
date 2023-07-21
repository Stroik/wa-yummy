import { Router } from 'express';
import { upload, getMediaFiles } from '../controllers/upload.controller';

const router = Router();

router.post('/', upload);
router.get('/', getMediaFiles);

export default router;
