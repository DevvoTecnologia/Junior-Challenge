import { check, ValidationChain } from "express-validator";

export const createRingValidationRules = (): ValidationChain[] => [
  check("nome")
    .notEmpty()
    .withMessage("O campo 'nome' é obrigatório.")
    .isString()
    .withMessage("O campo 'nome' deve ser uma string.")
    .isLength({ min: 2 })
    .withMessage("O campo 'nome' deve ter pelo menos 2 caracteres."),

  check("poder")
    .notEmpty()
    .withMessage("O campo 'poder' é obrigatório.")
    .isString()
    .withMessage("O campo 'poder' deve ser uma string.")
    .isLength({ min: 2 })
    .withMessage("O campo 'poder' deve ter pelo menos 2 caracteres."),

  check("imagem")
    .notEmpty()
    .withMessage("O campo 'imagem' é obrigatório.")
    .isString()
    .withMessage("O campo 'imagem' deve ser uma URL válida.")
    .isURL()
    .withMessage("O campo 'imagem' deve ser uma URL válida."),

  check("forjadoPorId")
    .notEmpty()
    .withMessage("O campo 'forjadoPorId' é obrigatório.")
    .isInt({ gt: 0 })
    .withMessage(
      "O campo 'forjadoPorId' deve ser um número inteiro maior que zero."
    ),

  check("portador")
    .notEmpty()
    .withMessage("O campo 'portador' é obrigatório.")
    .isObject()
    .withMessage("O campo 'portador' deve ser um objeto com o campo 'nome'."),

  check("portador.nome")
    .notEmpty()
    .withMessage("O campo 'portador.nome' é obrigatório.")
    .isString()
    .withMessage("O campo 'portador.nome' deve ser uma string.")
    .isLength({ min: 2 })
    .withMessage("O campo 'portador.nome' deve ter pelo menos 2 caracteres."),
];
