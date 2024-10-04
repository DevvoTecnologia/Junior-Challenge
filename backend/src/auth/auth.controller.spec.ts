import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../users/user.entity';
import { Anel } from '../aneis/anel.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('Deve retornar o token JWT e as informações do usuário caso o login seja válido', async () => {
      const mockUser: Omit<User, 'senha'> = {
        id: 1,
        nome: 'Test User',
        email: 'test@example.com',
        aneis: [] as Anel[]
      };
      const mockLoginResult = {
        access_token: 'jwt_token',
        id: 1,
        nome: 'Test User',
        email: 'test@example.com',
        aneis: [] as Anel[]
      };
      jest.spyOn(service, 'validateUser').mockResolvedValue(mockUser);
      jest.spyOn(service, 'login').mockResolvedValue(mockLoginResult);

      expect(await controller.login({ email: 'test@example.com', senha: 'password' })).toEqual(mockLoginResult);
    });

    it('Deve retornoar um UnauthorizedException se as credenciais forem inválidas', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      await expect(controller.login({ email: 'test@example.com', senha: 'wrong_password' }))
        .rejects.toThrow(UnauthorizedException);
    });
  });
});