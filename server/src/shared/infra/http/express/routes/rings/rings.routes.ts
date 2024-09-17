import { Request, Response, Router } from "express";
import { RingsService } from "../../../../../../modules/rings/services/RingsService";
import { RingsRepository } from "../../../../../../modules/rings/repository/RingsRepository";
import { container } from "tsyringe";

export const ringsRoute = Router();
const ringsRepository = new RingsRepository()
export const ringsService = new RingsService(ringsRepository)

ringsRoute.post("/", async (request: Request, response: Response) => {
  const { nome, poder, portador, forjadoPor, imagem } =
    await request.body;

  const service = container.resolve(RingsService)

  const successOrFailure = await service.create({
    nome,
    poder,
    portador,
    forjadoPor,
    imagem,
  });

  if (!successOrFailure || successOrFailure.isFailure) {
    return response.status(400).send({ error: successOrFailure.error });
  }

  return response.status(201).send();
});

ringsRoute.get("/", async (request: Request, response: Response) => {
  const service = container.resolve(RingsService)
  
  const rings = await service.getAll()

  return response.status(200).send({ rings });
});

ringsRoute.put("/", async (request: Request, response: Response) => {
  const { id, nome, poder, portador, forjadoPor, imagem } = await request.body;

  const successOrFailure = await ringsService.getByName({ nome })

  if (!successOrFailure || successOrFailure.isFailure) {
    return response.status(400).send({ error: successOrFailure.error });
  }

  const ring = successOrFailure.getValue()

  await ringsService.edit({ id: ring.id, nome, poder, portador, forjadoPor, imagem })

  return response.status(200).send();
});

ringsRoute.delete("/", async (request: Request, response: Response) => {
  const { nome } = await request.body;

  const service = container.resolve(RingsService)

  const successOrFailure = await service.getByName({ nome })

  if (!successOrFailure || successOrFailure.isFailure) {
    return response.status(400).send({ error: successOrFailure.error });
  }

  const ring = successOrFailure.getValue()

  await ringsService.delete({ id: ring.id })

  return response.status(200).send();
});
