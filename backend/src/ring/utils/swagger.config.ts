import type { ApiBodyOptions, ApiResponseOptions } from "@nestjs/swagger";

const ringResponse = {
  id: 3,
  name: "Isildur's Bane",
  power: "Corrupts its bearer, leading to their downfall.",
  owner: "Isildur",
  forgedBy: "Homens",
  image: "uuid-id-originalname.png",
  userId: 2,
  updatedAt: "2024-10-05T06:09:30.870Z",
  createdAt: "2024-10-05T06:09:30.870Z",
  url: "http://localhost:3000/uploads/uuid-id-originalname.png",
};

const multipartFormData = {
  name: { type: "string", example: "Anel do Poder" },
  power: { type: "string", example: "Controlar todos os anéis" },
  owner: { type: "string", example: "Sauron" },
  forgedBy: { type: "string", example: "Sauron" },
  image: { type: "string", format: "binary" },
};

export const findAllApiOkResponse: ApiResponseOptions = {
  isArray: true,
  example: [ringResponse],
};

export const findOneApiOkResponse: ApiResponseOptions = {
  example: ringResponse,
};

export const createApiBody: ApiBodyOptions = {
  description: "Create ring with image",
  schema: {
    type: "object",
    properties: multipartFormData,
  },
};

export const createApiOkResponse: ApiResponseOptions = {
  example: ringResponse,
};

export const updateApiBody: ApiBodyOptions = {
  description: "Update ring with image",
  schema: {
    type: "object",
    properties: multipartFormData,
  },
};

export const updateApiOkResponse: ApiResponseOptions = {
  example: ringResponse,
};
