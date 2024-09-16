import { Request, Response, Router } from "express";
import { Anel } from "../entities/Anel";
import AnelRespository from "../repositories/AnelRespository";
import { IAnel } from "../interfaces/IAnel";
import { TipoForjador } from "../types/TipoForjador";
import { validarQuantidade, validation } from "../utils/validation";

const anelRouter = Router();

anelRouter.get("/", async (_req: Request, res: Response): Promise<Response> => {
  const aneis = await AnelRespository.getAneis();
  return res.status(200).json(aneis);
});

anelRouter.post("/", async (req: Request, res: Response): Promise<Response> => {
  const { name, power, holder, forger } = req.body;

  const vazio = validation({ name, power, holder, forger });

  if (vazio.length > 0) {
    return res.status(400).json({
      error: `${vazio} ${
        vazio.length > 1 ? "são obrigatorio" : "é obrigatório"
      }`,
    });
  }

  //Verifica forger
  if (!Object.values(TipoForjador).includes(forger)) {
    return res.status(400).json({ error: "Forjador não permitido" });
  }

  if (await validarQuantidade(forger)) {
    return res.status(400).json({
      error: `${forger} já possui o número máximo de anéis permitidos.`,
    });
  }

  try {
    const novoAnel = await AnelRespository.createAnel({
      name,
      power,
      holder,
      forger,
    });
    return res.status(201).json(novoAnel);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

anelRouter.put(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.id) as number;

    const { name, power, holder, forger } = req.body;

    const vazio = validation({ name, power, holder, forger });

    if (vazio.length > 0) {
      return res.status(400).json({
        error: `${vazio} ${
          vazio.length > 1 ? "são obrigatorio" : "é obrigatório"
        }`,
      });
    }

    //Verifica forger
    if (!Object.values(TipoForjador).includes(forger)) {
      return res.status(400).json({ error: "Forjador não permitido" });
    }
    try {
      const atualizadoAnel = await AnelRespository.atualizarAnel({
        id,
        name,
        power,
        holder,
        forger,
      });
      return res.status(201).json(atualizadoAnel);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
);

anelRouter.delete(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.id) as number;
    try {
      const deletarAnel = await AnelRespository.deletarAnel(id);
      return res.status(201).json(deletarAnel);

    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
);

export default anelRouter;
