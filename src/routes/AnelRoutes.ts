import { Router } from 'express';
import { AnelController } from '../controllers/AnelController';
import upload from '../middleware/imgMiddleWare';

const router = Router();

  router.get('/aneis', (req, res, next) => {
    AnelController.listarAneis()
      .then(result => res.json(result))
      .catch(err => next(err));
  });
  router.get('/aneis/:id', (req, res, next) => {
    AnelController.obterAnelPorId(parseInt(req.params.id))
      .then(result => res.json(result))
      .catch(err => next(err));
  });

  router.put('/aneis', (req, res, next) => {
    AnelController.atualizarAnel(req.body)
      .then(result => res.json(result))
      .catch(err => next(err));
  });
  
  router.post('/aneis', (req, res, next) => {
    console.log(req.body)
    AnelController.criarAnel(req.body)
      .then(result => res.json(result))
      .catch(err => next(err));
  });

  router.delete('/aneis/:id', (req, res, next) => {
    AnelController.deletarAnel(parseInt(req.params.id))
      .then(result => res.json(result))
      .catch(err => next(err));
  });

  router.post('/aneis/upload-image', upload.single('file'), async (req, res, next) => {
    try {
      const file: Express.Multer.File = req.file as Express.Multer.File;
      const portadorId = parseInt(req.body.id, 10);
  
      if (isNaN(portadorId)) {
        return res.status(400).json({ success: false, status: 'Validation Error', data: { message: 'Invalid portador ID' } });
      }
  
      const result = await AnelController.uploadImage(file,{ id: portadorId });
      res.json(result);
    } catch (err) {
      next(err);
    }
  });
  
  router.post('/aneis/edit-image', upload.single('file'), (req, res, next) => {
    const file:any = req && req.file
    AnelController.updateImage(req.body,file)
      .then(result => res.json(result))
      .catch(err => next(err));
  });
  
export default router;
