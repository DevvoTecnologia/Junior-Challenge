import type { CacheModuleOptions } from "@nestjs/cache-manager";
import type {
  FileTypeValidatorOptions,
  MaxFileSizeValidatorOptions,
} from "@nestjs/common";
import { minutes, seconds } from "@nestjs/throttler";

export const cacheKeys = {
  users: (): string => "users",
  user: (userId: number): string => `user_${userId}`,
  rings: (userId: number): string => `rings_user_${userId}`,
  ring: (ringId: number, userId: number): string =>
    `ring_${ringId}_user_${userId}`,
};

export const cacheTtl = 60000 * 10; // 10 minutes

export const cacheModuleOptions: CacheModuleOptions = {
  ttl: cacheTtl,
};

export const fileValidation: {
  image: {
    size: MaxFileSizeValidatorOptions;
    allowedTypes: FileTypeValidatorOptions["fileType"];
  };
} = {
  image: {
    size: {
      maxSize: 1024 * 1024 * 1, // 1MB
      message: "File is too large. Max size is 1MB",
    },
    allowedTypes: /jpeg|png/,
  },
};

export const throttler = {
  global: {
    ttl: seconds(10),
    limit: 5,
    blockDuration: {
      POST: {
        "/user": seconds(8),
      },
      DELETE: minutes(1),
      PUT: seconds(15),
      default: seconds(20),
    },
  },
};
