import type { ApiResponseOptions } from "@nestjs/swagger";

const userResponseGet = {
  id: 1,
  username: "admin",
  email: "admin@admin.com",
  rings: [
    {
      id: 4,
      name: "Isildur's Bane",
      power: "Isildur's Bane",
      owner: "Isildur's Bane",
      forgedBy: "Elfos",
      image: "uuid-id-originalname.png",
      url: "http://localhost:3000/uploads/uuid-id-originalname.png",
    },
  ],
};

const userResponseCreateOrUpdate = {
  id: 1,
  username: "admin",
  email: "admin@admin.com",
};

export const findAllApiOkResponse: ApiResponseOptions = {
  isArray: true,
  example: [userResponseGet],
};

export const findOneApiOkResponse: ApiResponseOptions = {
  example: userResponseGet,
};

export const createApiOkResponse: ApiResponseOptions = {
  example: userResponseCreateOrUpdate,
};

export const updateApiOkResponse: ApiResponseOptions = {
  example: userResponseCreateOrUpdate,
};
