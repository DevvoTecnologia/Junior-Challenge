import express from "express";
import { config } from "dotenv";
import { MongoGetRingsRepository } from "./repositories/get-rings/mongo-get-rings";
import { GetRingsController } from "./controllers/get-ring/get-rings";
import { MongoClient } from "./database/mongo";
import { MongoCreateRingRepository } from "./repositories/get-rings/create-ring/mongo-create-ring";
import { CreateRingController } from "./controllers/create-ring/create-ring";
import { MongoUpdateRingRepository } from "./repositories/update-ring/mongo-update-ring";
import { UpdateRingController } from "./controllers/update-ring/update-ring";

const main = async () => {
  config();

  const app = express();

  //converte os dados recebidos no body para arquivos json
  app.use(express.json());

  await MongoClient.connect();

  app.get("/rings", async (req, res) => {
    const mongoGetRingsRepository = new MongoGetRingsRepository();

    const getRingsController = new GetRingsController(mongoGetRingsRepository);

    const { body, statusCode } = await getRingsController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/rings", async (req, res) => {
    const mongoCreateRingRepository = new MongoCreateRingRepository();

    const createRingController = new CreateRingController(
      mongoCreateRingRepository
    );

    const { body, statusCode } = await createRingController.handle({
      body: req.body,
    });
    res.status(statusCode).send(body);
  });

  app.patch("/rings/:id", async (req, res) => {
    const mongoUpdateRingRepository = new MongoUpdateRingRepository();

    const updateRingController = new UpdateRingController(
      mongoUpdateRingRepository
    );

    const { body, statusCode } = await updateRingController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
