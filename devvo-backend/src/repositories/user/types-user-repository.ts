import { Prisma } from "@prisma/client";

export type UserCreateInput = Prisma.UserCreateInput;

export default interface IUserRepository {
  create(data: UserCreateInput): Promise<any>;
  findByEmail(email: string): Promise<any | null>;
  findById(id: string): Promise<any | null>;
}
