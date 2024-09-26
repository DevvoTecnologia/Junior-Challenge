import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const logger = new Logger("bootstrap");

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get("port");
  const host = configService.get("host");
  const tokenEx =
    configService.get("TOKEN_EXAMPLE") || "thisIsASampleBearerAuthToken123";

  const config = new DocumentBuilder()
    .setTitle("Junior-Challenge")
    .setDescription("Junior-Challenge API")
    .setVersion("1.0")
    .addBearerAuth(undefined, "defaultBearerAuth")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    customSiteTitle: "Junior-Challenge API",
    swaggerOptions: {
      authAction: {
        defaultBearerAuth: {
          name: "defaultBearerAuth",
          schema: {
            description: "Default",
            type: "http",
            in: "header",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
          value: tokenEx, // This is the default value for the token
        },
      },
    },
  });

  await app.listen(port, () => {
    logger.verbose(`Server is running on ${host}:${port}`);
  });
}

bootstrap();
