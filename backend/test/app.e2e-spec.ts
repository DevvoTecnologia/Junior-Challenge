import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

import { AppModule } from "../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer()).get("/").expect(200).expect("Pong!");
  });

  it("/user (GET)", () => {
    return request(app.getHttpServer())
      .get("/user")
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        res.body.forEach((user: unknown) => {
          expect(user).toHaveProperty("id");
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("rings");
        });
      });
  });
});
