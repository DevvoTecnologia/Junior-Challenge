import type { ExecutionContext } from "@nestjs/common";
import type { ThrottlerOptions } from "@nestjs/throttler";
import { throttler } from "src/global/constants";

export const throttlerGlobalConfig: ThrottlerOptions = {
  ttl: throttler.global.ttl,
  limit: throttler.global.limit,
  blockDuration: (context: ExecutionContext): number => {
    const request: Request = context.switchToHttp().getRequest();
    if (request.method === "POST" && request.url === "/user") {
      return throttler.global.blockDuration.POST["/user"];
    }
    if (request.method === "DELETE") {
      return throttler.global.blockDuration.DELETE;
    }
    if (request.method === "PUT") {
      return throttler.global.blockDuration.PUT;
    }
    return throttler.global.blockDuration.default;
  },
  skipIf: (context: ExecutionContext): boolean => {
    const request: Request = context.switchToHttp().getRequest();
    const isGetRequest = request.method === "GET";
    return isGetRequest;
  },
};
