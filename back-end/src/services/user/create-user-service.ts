import { SignUpRequest } from '../../interfaces/user-request';
import { prismaClient } from '../../lib/prisma';
import { hash } from 'bcryptjs';

export class CreateUserService {
  async execute({ name, email, password }: SignUpRequest) {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error('Email já cadastrado.');
    }

    const hashedPassword = await hash(password, 10);

    return prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}
