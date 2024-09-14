import { Router } from 'express';
import { createRing, getAllRings, updateRing, deleteRing } from '../controllers/ringController';

const router = Router();

/**
 * @openapi
 * /rings:
 *   post:
 *     summary: Cria um novo anel
 *     description: Cria um anel com as informações fornecidas. Valida se o forjador está correto e se o limite de anéis não foi atingido.
 *     requestBody:
 *       description: Informações do anel a ser criado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do anel
 *               poder:
 *                 type: string
 *                 description: Descrição do poder do anel
 *               portador:
 *                 type: string
 *                 description: Nome do portador atual
 *               forjadoPor:
 *                 type: string
 *                 description: Quem forjou o anel (Elfos, Anões, Homens, Sauron)
 *               imagem:
 *                 type: string
 *                 description: URL da imagem do anel
 *     responses:
 *       201:
 *         description: Anel criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nome:
 *                   type: string
 *                 poder:
 *                   type: string
 *                 portador:
 *                   type: string
 *                 forjadoPor:
 *                   type: string
 *                 imagem:
 *                   type: string
 *       400:
 *         description: Dados inválidos ou limite de anéis atingido
 *       500:
 *         description: Erro ao criar o anel
 */
router.post('/', createRing);

/**
 * @openapi
 * /rings:
 *   get:
 *     summary: Lista todos os anéis
 *     description: Retorna uma lista com todos os anéis cadastrados.
 *     responses:
 *       200:
 *         description: Lista de anéis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nome:
 *                     type: string
 *                   poder:
 *                     type: string
 *                   portador:
 *                     type: string
 *                   forjadoPor:
 *                     type: string
 *                   imagem:
 *                     type: string
 *       500:
 *         description: Erro ao buscar os anéis
 */
router.get('/', getAllRings);

/**
 * @openapi
 * /rings/{id}:
 *   put:
 *     summary: Atualiza um anel existente
 *     description: Atualiza as informações de um anel com base no ID fornecido.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do anel a ser atualizado
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Novas informações para o anel
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do anel
 *               poder:
 *                 type: string
 *                 description: Descrição do poder do anel
 *               portador:
 *                 type: string
 *                 description: Nome do portador atual
 *               forjadoPor:
 *                 type: string
 *                 description: Quem forjou o anel (Elfos, Anões, Homens, Sauron)
 *               imagem:
 *                 type: string
 *                 description: URL da imagem do anel
 *     responses:
 *       200:
 *         description: Anel atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nome:
 *                   type: string
 *                 poder:
 *                   type: string
 *                 portador:
 *                   type: string
 *                 forjadoPor:
 *                   type: string
 *                 imagem:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Anel não encontrado
 *       500:
 *         description: Erro ao atualizar o anel
 */
router.put('/:id', updateRing);

/**
 * @openapi
 * /rings/{id}:
 *   delete:
 *     summary: Deleta um anel existente
 *     description: Remove um anel do banco de dados com base no ID fornecido.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do anel a ser deletado
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Anel deletado com sucesso
 *       404:
 *         description: Anel não encontrado
 *       500:
 *         description: Erro ao deletar o anel
 */
router.delete('/:id', deleteRing);

export default router;
