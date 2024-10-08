import type { ApiResponseOptions } from "@nestjs/swagger";

interface HttpExceptionDto {
  message?: string | string[];
  error: string;
  statusCode: number;
}

export const errorResponsePatternStructure: ApiResponseOptions = {
  status: undefined,
  description: "Internal Server Error",
  content: {
    "application/json": {
      examples: {
        example1: {
          summary: "Single string message",
          value: {
            message: "Some error message",
            error: "Some error",
            statusCode: 500,
          } as HttpExceptionDto,
        },
        example2: {
          summary: "Array of string messages",
          value: {
            message: ["Error message 1", "Error message 2"],
            error: "Some error",
            statusCode: 500,
          } as HttpExceptionDto,
        },
        example3: {
          summary: "No message",
          value: {
            error: "Some error",
            statusCode: 500,
          } as HttpExceptionDto,
        },
      },
    },
  },
};
