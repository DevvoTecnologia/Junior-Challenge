import { Router } from 'express';
import { addRing, getRings, updateRing, deleteRing, upload } from '../controllers/ringController';

const router = Router();

router.post('/', upload.single('imagem'), addRing);
router.get('/', (req, res) => getRings(req, res));
router.get('/:id', (req, res) => getRings(req, res));
router.put('/:id', upload.single('imagem'), updateRing);
router.delete('/:id', (req, res) => deleteRing(req, res));

export default router;

