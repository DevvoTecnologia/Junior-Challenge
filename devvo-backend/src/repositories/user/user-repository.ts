import { prisma } from "../../../prisma/prisma-client";
import IUserRepository, { UserCreateInput } from "./types-user-repository";

export class UserRepository implements IUserRepository {
  async create(data: UserCreateInput): Promise<any> {
    const user = await prisma.user.create({ data });
    return user;
  }

  async findByEmail(email: string): Promise<any | null> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      console.log("a");
      return user;
    } catch (error) {
      return null;
    }
  }

  async findById(id: string): Promise<any | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }
}
