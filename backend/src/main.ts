import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const host = process.env.HOST || "http://localhost";

  const logger = new Logger("bootstrap");

  const app = await NestFactory.create(AppModule);

  await app.listen(port, () => {
    logger.verbose(`Server is running on ${host}:${port}`);
  });
}

bootstrap();
