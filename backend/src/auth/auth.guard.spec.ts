import type { ExecutionContext } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue("test-secret"),
          },
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  it("should be defined", () => {
    expect(authGuard).toBeDefined();
  });

  it("should throw UnauthorizedException if no token is provided", async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: (): object => ({
          headers: {},
        }),
      }),
    } as ExecutionContext;

    await expect(authGuard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it("should throw UnauthorizedException if token is invalid", async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: (): object => ({
          headers: {
            authorization: "Bearer invalid-token",
          },
        }),
      }),
    } as ExecutionContext;

    jest.spyOn(jwtService, "verifyAsync").mockRejectedValue(new Error());

    await expect(authGuard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it("should return true if token is valid", async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: (): object => ({
          headers: {
            authorization: "Bearer valid-token",
          },
        }),
      }),
    } as ExecutionContext;

    jest.spyOn(jwtService, "verifyAsync").mockResolvedValue({ userId: 1 });

    await expect(authGuard.canActivate(context)).resolves.toBe(true);
  });

  it("should assign payload to request object if token is valid", async () => {
    const request: { headers: { authorization: string }; user?: object } = {
      headers: {
        authorization: "Bearer valid-token",
      },
    };
    const context = {
      switchToHttp: () => ({
        getRequest: (): object => request,
      }),
    } as ExecutionContext;

    const payload = { userId: 1 };
    jest.spyOn(jwtService, "verifyAsync").mockResolvedValue(payload);

    await authGuard.canActivate(context);
    expect(request["user"]).toEqual(payload);
  });
});
