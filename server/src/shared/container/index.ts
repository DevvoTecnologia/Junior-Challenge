import { container } from "tsyringe";
import { IRingsRepository } from "../../modules/rings/repository/IRingsRepository";
import { RingsRepository } from "../../modules/rings/repository/RingsRepository";

container.registerSingleton<IRingsRepository>(
  "RingsRepository",
  RingsRepository
);
