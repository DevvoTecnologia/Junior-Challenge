import { UnauthorizedException } from "@nestjs/common";

import { JwtAuthGuard } from "./jwt-auth.guard";

describe("JwtAuthGuard", () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    guard = new JwtAuthGuard();
  });

  it("should throw an error if there is an error", () => {
    const error = new Error("Test error");
    expect(() => guard.handleRequest(error, false, undefined)).toThrow(error);
  });

  it('should throw UnauthorizedException with "Missing token" message if no auth token', () => {
    const info = { message: "No auth token" } as Error;
    expect(() => guard.handleRequest(null, false, info)).toThrow(
      new UnauthorizedException("Missing token"),
    );
  });

  it('should throw UnauthorizedException with "Token is invalid or expired" message if token is invalid or expired', () => {
    const info = { message: "Token is invalid or expired" } as Error;
    expect(() => guard.handleRequest(null, false, info)).toThrow(
      new UnauthorizedException("Token is invalid or expired"),
    );
  });

  it("should throw UnauthorizedException if no user and no info", () => {
    expect(() => guard.handleRequest(null, false, undefined)).toThrow(
      UnauthorizedException,
    );
  });

  it("should return the user if no error and user is present", () => {
    const user = { id: 1, username: "testuser" };
    expect(guard.handleRequest(null, user, undefined)).toBe(user);
  });
});
