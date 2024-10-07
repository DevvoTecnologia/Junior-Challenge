import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { isEmpty } from 'lodash';
import { PrismaService } from 'src/provider/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }

  async createNewUser(userDto: UserDto): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { email: userDto.email },
    });

    if (!isEmpty(user)) {
      throw new HttpException('Já existe um usuário com esse e-mail.', HttpStatus.CONFLICT);
    };

    if (userDto.password) {
      const passwordHash = await hash(userDto?.password, 10);
      userDto.password = passwordHash;
    }


    const newUser = await this.prismaService.user.create({
      data: {
        name: userDto.name,
        email: userDto.email,
        password: userDto.password,
      },
    });

    if (!newUser) {
      throw new HttpException('Erro ao criar o usuário. Tente novamente.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  async updateActualUser (userDto: UserDto, id: number): Promise<void> {
    const actualUser = await this.prismaService.user.findUnique({
      where: { id }
    });

    if (!actualUser) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.user.update({
      where: { id: id },
      data: {
        name: userDto.name,
        email: userDto.email,
        password: userDto.password,
      }
    })
  };

  async deleteActualUser (id: number): Promise<void> {
    const actualUser = await this.prismaService.user.findUnique({
      where: { id }
    });

    if (!actualUser) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.user.delete({
      where: { id }
    });
  };
};