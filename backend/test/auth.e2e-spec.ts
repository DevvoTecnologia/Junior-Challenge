import { HttpStatus, type INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

import { AppModule } from "../src/app.module";

describe("AuthController (e2e)", () => {
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

  describe("/auth/login (POST)", () => {
    it("should login with valid credentials", () => {
      return request(app.getHttpServer())
        .post("/auth/login")
        .send({ email: "admin@admin.com", password: "admin" })
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toHaveProperty("accessToken");
        });
    });

    it("should return unauthorized with invalid credentials", () => {
      return request(app.getHttpServer())
        .post("/auth/login")
        .send({ email: "admin@admin.com", password: "wrong" })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it("should return unauthorized with missing credentials", () => {
      return request(app.getHttpServer())
        .post("/auth/login")
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return unauthorized with empty credentials", () => {
      return request(app.getHttpServer())
        .post("/auth/login")
        .send({ email: "", password: "" })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return unauthorized with empty email", () => {
      return request(app.getHttpServer())
        .post("/auth/login")
        .send({ email: "", password: "password" })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return unauthorized with empty password", () => {
      return request(app.getHttpServer())
        .post("/auth/login")
        .send({ email: "admin@admin.com", password: "" })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return BadRequest when isNotEmail", () => {
      return request(app.getHttpServer())
        .post("/auth/login")
        .send({ email: "notfound", password: "password" })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return unauthorized when user not found", () => {
      return request(app.getHttpServer())
        .post("/auth/login")
        .send({ email: "adminasdasdasdasdasd@aa.com", password: "password" })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe("/auth/test (GET)", () => {
    it("should return 401 unauthorized", () => {
      return request(app.getHttpServer())
        .get("/auth/test")
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
