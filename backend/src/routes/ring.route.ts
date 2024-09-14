import { Router } from 'express';
import { criarAnel, listarAneis, atualizarAnel, deletarAnel } from '../controllers/ring.controller';
import { validateAnelCreation, validateAnelUpdate,  } from '../middlewares/validation.middleware';

const router = Router();

router.post('/', validateAnelCreation, criarAnel);
router.get('/', listarAneis);
router.put('/:id', validateAnelUpdate, atualizarAnel);
router.delete('/:id', deletarAnel);

export default router;
