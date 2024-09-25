import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const port = 3000;
  const host = "http://localhost";

  const logger = new Logger("bootstrap");

  const app = await NestFactory.create(AppModule);

  await app.listen(port, () => {
    logger.verbose(`Server is running on ${host}:${port}`);
  });
}

bootstrap();
