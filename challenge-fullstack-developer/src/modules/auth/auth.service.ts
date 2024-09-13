import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/provider/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { ResponseAuth } from './interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

  async login(data: AuthDto): Promise<ResponseAuth> {

    const user = await this.prismaService.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    };

    const comparePassword = await compare(data.password, user.password);

    if (!comparePassword) {
      throw new HttpException('Credenciais inválidas.', HttpStatus.UNAUTHORIZED);
    };

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens
    };
  }

  async logout(userId: number): Promise<void> {
    await this.prismaService.user.update({
      where: { id: userId },
      data: { refresh_token: null },
    });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    const isValidRefreshToken = await compare(refreshToken, user.refresh_token);

    if (!isValidRefreshToken) {
      throw new HttpException('Refresh Token inválido.', HttpStatus.UNAUTHORIZED);
    };

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens
    };
  }

  private async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.prismaService.user.update({
      where: { id: userId },
      data: { refresh_token: hashedRefreshToken },
    });
  }

  private async getTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '30m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
};