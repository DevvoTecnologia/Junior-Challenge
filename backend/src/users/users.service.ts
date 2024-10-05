import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  UpdateUserWithPasswordDto,
  UpdatePasswordDto,
} from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.senha, saltRounds);
    const user = this.usersRepository.create({
      ...createUserDto,
      senha: hashedPassword,
      imagem: createUserDto.imagem || 'https://example.com/default-avatar.jpg',
    });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['aneis'],
    });
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserWithPasswordDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(
      updateUserDto.senhaAtual,
      user.senha,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha atual incorreta');
    }

    if (updateUserDto.nome) user.nome = updateUserDto.nome;
    if (updateUserDto.email) user.email = updateUserDto.email;
    if (updateUserDto.imagem) user.imagem = updateUserDto.imagem;

    return this.usersRepository.save(user);
  }

  async updatePassword(
    userId: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(
      updatePasswordDto.senhaAtual,
      user.senha,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha atual incorreta');
    }

    const hashedNewPassword = await bcrypt.hash(
      updatePasswordDto.novaSenha,
      10,
    );
    user.senha = hashedNewPassword;

    await this.usersRepository.save(user);
  }
}
