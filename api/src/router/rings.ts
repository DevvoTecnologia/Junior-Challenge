import express from 'express';

import { deleteRing, getAllRings, getRing, saveRing, updateRing } from '../controllers/rings';
import { countRingsForger, isAuthenticated} from '../middlewares';

export default (router: express.Router) => {
  router.get('/rings', isAuthenticated, getAllRings);
  router.post('/ring/create', isAuthenticated, countRingsForger, saveRing);
  router.get('/ring/:id', isAuthenticated, getRing);
  router.patch('/ring/:id', isAuthenticated, updateRing);
  router.delete('/ring/:id', isAuthenticated, deleteRing);
}