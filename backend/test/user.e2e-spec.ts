import { HttpStatus, type INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

import { AppModule } from "../src/app.module";

describe("UserController (e2e)", () => {
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

  describe("/user (GET)", () => {
    it("should return 200 OK with users", () => {
      return request(app.getHttpServer())
        .get("/user")
        .expect(HttpStatus.OK)
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

  describe("/user/:id (GET)", () => {
    it("should return 200 OK with user", () => {
      return request(app.getHttpServer())
        .get("/user/1")
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toHaveProperty("id");
          expect(res.body).toHaveProperty("username");
          expect(res.body).toHaveProperty("rings");
        });
    });

    it("should return 404 Not Found with invalid id", () => {
      return request(app.getHttpServer())
        .get("/user/0")
        .expect(HttpStatus.NOT_FOUND);
    });

    it("should return 400 Bad Request with invalid id", () => {
      return request(app.getHttpServer())
        .get("/user/invalid")
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe("/user/:id (PUT)", () => {
    it("should return 401 unauthorized", () => {
      return request(app.getHttpServer())
        .put("/user/1")
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe("/user/:id (DELETE)", () => {
    it("should return 401 unauthorized", () => {
      return request(app.getHttpServer())
        .delete("/user/1")
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
