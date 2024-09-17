import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

const router = Router();



  router.get('/usuarios', (req, res, next) => {
    UsuarioController.listarUsuarios()
      .then(result => res.json(result))
      .catch(err => next(err));
  });
  router.get('/usuarios/:id', (req, res, next) => {
    UsuarioController.obterUsuarioPorId(parseInt(req.params.id))
      .then(result => res.json(result))
      .catch(err => next(err));
  });
  
  router.post('/usuarios', (req, res, next) => {
    UsuarioController.criarUsuario(req.body)
      .then(result => res.json(result))
      .catch(err => next(err));
  });
  
export default router;
