import type { ExecutionContext } from "@nestjs/common";

import { throttlerGlobalConfig } from "../throttler.config";

describe("throttlerGlobalConfig", () => {
  const config = throttlerGlobalConfig;

  it("should have a ttl of 10 seconds", () => {
    expect(config.ttl).toBe(10 * 1000);
  });

  it("should have a limit of 5", () => {
    expect(config.limit).toBe(5);
  });

  describe("blockDuration", () => {
    const mockContext = (method: string, url: string): ExecutionContext =>
      ({
        switchToHttp: () => ({
          getRequest: () => ({ method, url }),
        }),
      }) as unknown as ExecutionContext;

    it("should return 8 seconds for POST /user", () => {
      const context = mockContext("POST", "/user");
      expect(
        typeof config.blockDuration === "function"
          ? config.blockDuration(context)
          : undefined,
      ).toBe(8 * 1000);
    });

    it("should return 60 seconds for DELETE requests", () => {
      const context = mockContext("DELETE", "/any-url");
      expect(
        typeof config.blockDuration === "function"
          ? config.blockDuration(context)
          : undefined,
      ).toBe(60 * 1000);
    });

    it("should return 15 seconds for PUT requests", () => {
      const context = mockContext("PUT", "/any-url");
      expect(
        typeof config.blockDuration === "function"
          ? config.blockDuration(context)
          : undefined,
      ).toBe(15 * 1000);
    });

    it("should return 20 seconds for other requests", () => {
      const context = mockContext("POST", "/other-url");
      expect(
        typeof config.blockDuration === "function"
          ? config.blockDuration(context)
          : undefined,
      ).toBe(20 * 1000);
    });
  });

  describe("skipIf", () => {
    const mockContext = (method: string): ExecutionContext =>
      ({
        switchToHttp: () => ({
          getRequest: () => ({ method }),
        }),
      }) as unknown as ExecutionContext;

    it("should return true for GET requests", () => {
      const context = mockContext("GET");
      expect(
        typeof config.skipIf === "function"
          ? config.skipIf(context)
          : undefined,
      ).toBe(true);
    });

    it("should return false for non-GET requests", () => {
      const context = mockContext("POST");
      expect(
        typeof config.skipIf === "function"
          ? config.skipIf(context)
          : undefined,
      ).toBe(false);
    });
  });
});
