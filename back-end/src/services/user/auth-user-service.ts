import { compare } from 'bcryptjs';
import { SignInRequest } from '../../interfaces/user-request';
import { prismaClient } from '../../lib/prisma';
import { JwtService } from './jwt-service';

export class AuthUserService {
  async execute({ email, password }: SignInRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new Error('Email ou senha incorreto.');
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new Error('Email ou senha incorreto.');

    const jwtService = new JwtService();
    const accessToken = jwtService.generateToken(user.id);

    return { accessToken };
  }
}
