import { Request, Response, Router } from "express";

export const ringsRoute = Router();

const ringsRepository = /* new RingsRepositoryInMemory([]); */ {}
export const ringsService = /* new RingsService(ringsRepository); */ {}

ringsRoute.post("/", async (request: Request, response: Response) => {
  //   const { name, power, wearer, forjedBy, image } =
  //     await request.body;

  //   const successOrFailure = await ringsService.create({
  //     name,
  //     power,
  //     wearer,
  //     forjedBy,
  //     image,
  //   });

  //   if (!successOrFailure || successOrFailure.isFailure) {
  //     return response.status(400).send({ errors: successOrFailure.errors });
  //   }

  //   return response.status(201).send();
});

ringsRoute.get("/", async (request: Request, response: Response) => {

  return response.status(200).send({
    rings: [
      { hello: "world" }
    ]
  });
});
