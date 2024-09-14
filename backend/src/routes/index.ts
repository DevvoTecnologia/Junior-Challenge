import { Router } from 'express';
import anelRoutes from './ring.route';

const router = Router();

router.use('/aneis', anelRoutes);

export default router;
