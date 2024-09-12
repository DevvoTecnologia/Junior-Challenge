import 'fastify';
import { FastifyMultipartOptions } from 'fastify-multipart';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      userId: string;
    };
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    file(options?: FastifyMultipartOptions): Promise<{
      fieldname: string;
      originalFilename: string;
      encoding: string;
      mimetype: string;
      file: NodeJS.ReadableStream;
      filename: string;
    }>;
  }
}
