import { HttpStatus, type INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

import { AppModule } from "../src/app.module";

describe("RingController (e2e)", () => {
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

  describe("/ring (GET)", () => {
    it("should return 401 unauthorized", () => {
      return request(app.getHttpServer())
        .get("/ring")
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe("/ring (POST)", () => {
    it("should return 401 unauthorized", () => {
      return request(app.getHttpServer())
        .post("/ring")
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe("/ring/:id (PUT)", () => {
    it("should return 401 unauthorized", () => {
      return request(app.getHttpServer())
        .put("/ring/1")
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe("/ring/:id (DELETE)", () => {
    it("should return 401 unauthorized", () => {
      return request(app.getHttpServer())
        .delete("/ring/1")
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
