import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  UpdateUserWithPasswordDto,
  UpdatePasswordDto,
} from '../dto/update-user.dto';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            updateUser: jest.fn(),
            updatePassword: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Deve criar um novo usuário com imagem', async () => {
      const createUserDto: CreateUserDto = {
        nome: 'Test User',
        email: 'test@example.com',
        senha: 'password',
        imagem: 'http://example.com/avatar.jpg',
      };
      const mockUser = new User();
      Object.assign(mockUser, createUserDto);
      mockUser.id = 1;

      jest.spyOn(service, 'create').mockResolvedValue(mockUser);

      expect(await controller.create(createUserDto)).toEqual(mockUser);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });

    it('Deve criar um novo usuário sem imagem', async () => {
      const createUserDto: CreateUserDto = {
        nome: 'Test User',
        email: 'test@example.com',
        senha: 'password',
      };
      const mockUser = new User();
      Object.assign(mockUser, createUserDto);
      mockUser.id = 1;
      mockUser.imagem = 'https://example.com/default-avatar.jpg';

      jest.spyOn(service, 'create').mockResolvedValue(mockUser);

      expect(await controller.create(createUserDto)).toEqual(mockUser);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('updateProfile', () => {
    it('Deve atualizar o perfil do usuário com senha correta', async () => {
      const updateUserDto: UpdateUserWithPasswordDto = {
        nome: 'Updated Name',
        imagem: 'http://example.com/new-avatar.jpg',
        senhaAtual: 'correctPassword',
      };
      const mockUser = new User();
      Object.assign(mockUser, {
        id: 1,
        nome: updateUserDto.nome,
        imagem: updateUserDto.imagem,
      });

      jest.spyOn(service, 'updateUser').mockResolvedValue(mockUser);

      const req = { user: { userId: 1 } };
      expect(await controller.updateProfile(req, updateUserDto)).toEqual(
        mockUser,
      );
      expect(service.updateUser).toHaveBeenCalledWith(1, updateUserDto);
    });

    it('Deve lançar NotFoundException se o usuário não for encontrado', async () => {
      const updateUserDto: UpdateUserWithPasswordDto = {
        nome: 'Updated Name',
        senhaAtual: 'correctPassword',
      };
      jest
        .spyOn(service, 'updateUser')
        .mockRejectedValue(new NotFoundException());

      const req = { user: { userId: 999 } };
      await expect(
        controller.updateProfile(req, updateUserDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('Deve lançar UnauthorizedException se a senha atual estiver incorreta', async () => {
      const updateUserDto: UpdateUserWithPasswordDto = {
        nome: 'Updated Name',
        senhaAtual: 'wrongPassword',
      };
      jest
        .spyOn(service, 'updateUser')
        .mockRejectedValue(new UnauthorizedException('Senha atual incorreta'));

      const req = { user: { userId: 1 } };
      await expect(
        controller.updateProfile(req, updateUserDto),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('updatePassword', () => {
    it('Deve atualizar a senha do usuário', async () => {
      const updatePasswordDto: UpdatePasswordDto = {
        senhaAtual: 'oldpassword',
        novaSenha: 'newpassword',
      };
      jest.spyOn(service, 'updatePassword').mockResolvedValue(undefined);

      const req = { user: { userId: 1 } };
      await expect(
        controller.updatePassword(req, updatePasswordDto),
      ).resolves.not.toThrow();
      expect(service.updatePassword).toHaveBeenCalledWith(1, updatePasswordDto);
    });

    it('Deve lançar UnauthorizedException se a senha atual estiver incorreta', async () => {
      const updatePasswordDto: UpdatePasswordDto = {
        senhaAtual: 'wrongpassword',
        novaSenha: 'newpassword',
      };
      jest
        .spyOn(service, 'updatePassword')
        .mockRejectedValue(new UnauthorizedException('Senha atual incorreta'));

      const req = { user: { userId: 1 } };
      await expect(
        controller.updatePassword(req, updatePasswordDto),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
