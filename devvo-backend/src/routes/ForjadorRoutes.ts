import { Router } from 'express';
import { ForjadorController } from '../controllers/ForjadorController';

const router = Router();
const forjadorController = new ForjadorController();


router.get('/forjadores', (req, res) => forjadorController.getAllForjadores(req, res));

export default router;
