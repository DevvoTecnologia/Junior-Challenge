export type Forger = "HOMEM" | "SAURON" | "ELFO" | "ANAO";

export const forgerLimits: Record<Forger, number> = {
  HOMEM: 9,
  SAURON: 1,
  ELFO: 3,
  ANAO: 7,
} as const;

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  conflict = 409,
  preconditionFailed = 412,
  serverError = 500,
}
