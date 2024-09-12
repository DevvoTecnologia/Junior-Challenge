import { Injectable, PipeTransform, Type } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { validateGate } from '.';

export interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom';
  metatype?: Type<unknown>;
  data?: string;
}

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    return validateGate[metadata.type]?.(value, this.schema);
  }
}
