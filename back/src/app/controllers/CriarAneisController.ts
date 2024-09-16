import { Request, Response, Router } from "express";
import { Anel } from "../entities/Anel";
import AnelRespository from "../repositories/AnelRespository";
import { IAnel } from "../interfaces/IAnel";
import { TipoForjador } from "../types/TipoForjador";
import { validation } from "../utils/validation";

const anelRouter = Router();

anelRouter.post("/", async (req: Request, res: Response) => {
  const { name, power, holder, forger } = req.body;

  const vazio = validation({ name, power, holder, forger });

  if (!vazio) {
    return res
      .status(400)
      .json({ error: `${vazio} são obrigatórios` });
  }

  //Verifica forger
  if (!Object.values(TipoForjador).includes(forger)) {
    return res.status(400).json({ error: "forger inválido." });
  }

  try {
    const novoAnel = await AnelRespository.createAnel({
      name,
      power,
      holder,
      forger,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
