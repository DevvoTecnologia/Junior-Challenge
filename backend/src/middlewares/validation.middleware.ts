import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const validateAnelCreation = [
  check('nome').notEmpty().withMessage('O nome é obrigatório'),
  check('poder').notEmpty().withMessage('O poder é obrigatório'),
  check('portador').notEmpty().withMessage('O portador é obrigatório'),
  check('forjadoPor').isIn(['Elfos', 'Anões', 'Homens', 'Sauron']).withMessage('Forjador inválido'),
  check('imagem').optional().isURL().withMessage('A URL da imagem é inválida'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateAnelUpdate = [
  check('nome').optional().notEmpty().withMessage('O nome é obrigatório'),
  check('poder').optional().notEmpty().withMessage('O poder é obrigatório'),
  check('portador').optional().notEmpty().withMessage('O portador é obrigatório'),
  check('forjadoPor').optional().isIn(['Elfos', 'Anões', 'Homens', 'Sauron']).withMessage('Forjador inválido'),
  check('imagem').optional().isURL().withMessage('A URL da imagem é inválida'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
