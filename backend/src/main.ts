import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const logger = new Logger("bootstrap");

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get("port");
  const host = configService.get("host");
  const allowedOrigin = configService.get("allowedOrigin");

  app.enableCors({
    origin: allowedOrigin,
  });

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("Junior-Challenge")
    .setDescription("Junior-Challenge API")
    .setVersion("1.0")
    .addBearerAuth(undefined, "defaultBearerAuth")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document, {
    customSiteTitle: "Junior-Challenge API",
  });

  await app.listen(port, () => {
    logger.verbose(`Server is running on ${host}:${port}`);
  });
}

bootstrap();
