import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { Test, type TestingModule } from "@nestjs/testing";

import { AuthModule } from "./auth.module";

describe("AuthModule", () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AuthModule, SequelizeModule.forRoot({ dialect: "sqlite" })],
    }).compile();
  });

  it("should be defined", () => {
    expect(module).toBeDefined();
  });

  it("should JwtModule be defined", () => {
    expect(module.get(JwtModule)).toBeDefined();
  });
});
