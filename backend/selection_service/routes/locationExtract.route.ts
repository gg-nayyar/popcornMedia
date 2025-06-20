import { Router } from 'express';
import { locationExtractor } from '../controllers/locationExtractor.controller';

const router = Router();
router.get('/', locationExtractor);

export default router;
