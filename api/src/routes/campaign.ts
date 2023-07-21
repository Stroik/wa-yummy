import { Router } from 'express';
import {
  getCampaign,
  createCampaign,
  getCampaigns,
  sendCampaign,
  deleteCampaign,
} from '../controllers/campaign.controller';

const router = Router();

router.get('/', getCampaigns);
router.get('/:id', getCampaign);
router.post('/', createCampaign);
router.post('/:campaignId', sendCampaign);
router.delete('/:id', deleteCampaign);

export default router;
