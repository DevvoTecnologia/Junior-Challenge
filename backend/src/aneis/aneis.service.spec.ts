import { Test, TestingModule } from '@nestjs/testing';
import { AneisService } from './aneis.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anel } from './anel.entity';
import { User } from '../users/user.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateAnelDto, UpdateAnelDto } from '../dto/anel.dto';

describe('AneisService', () => {
  let service: AneisService;
  let anelRepo: Repository<Anel>;
  let userRepo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AneisService,
        {
          provide: getRepositoryToken(Anel),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AneisService>(AneisService);
    anelRepo = module.get<Repository<Anel>>(getRepositoryToken(Anel));
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllByUser', () => {
    it('should return an array of aneis for a user', async () => {
      const result = [new Anel()];
      jest.spyOn(anelRepo, 'find').mockResolvedValue(result);

      expect(await service.findAllByUser(1)).toEqual(result);
      expect(anelRepo.find).toHaveBeenCalledWith({
        where: { user: { id: 1 } },
        relations: ['user']
      });
    });
  });

  describe('findOneByUser', () => {
    it('should return an anel for a user', async () => {
      const result = new Anel();
      jest.spyOn(anelRepo, 'findOne').mockResolvedValue(result);

      expect(await service.findOneByUser(1, 1)).toEqual(result);
      expect(anelRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1, user: { id: 1 } },
        relations: ['user']
      });
    });

    it('Deve retornar um NotFoundException', async () => {
      jest.spyOn(anelRepo, 'findOne').mockResolvedValue(null);

      await expect(service.findOneByUser(1, 1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('Deve conseguir criar um anel', async () => {
      const createAnelDto: CreateAnelDto = {
        nome: 'Narya',
        poder: 'Fogo',
        portador: 'Gandalf',
        forjadoPor: 'Elfos',
        imagem: 'http://example.com/narya.jpg'
      };
      const newAnel = new Anel();
      Object.assign(newAnel, createAnelDto);

      const mockUser = new User();
      mockUser.id = 1;

      jest.spyOn(anelRepo, 'count').mockResolvedValue(0);
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(anelRepo, 'create').mockReturnValue(newAnel);
      jest.spyOn(anelRepo, 'save').mockResolvedValue(newAnel);

      const result = await service.create(createAnelDto, 1);
      expect(result).toEqual(newAnel);
    });

    it('Deve retornar um BadRequestException se o limite for excedido', async () => {
      const createAnelDto: CreateAnelDto = {
        nome: 'Narya',
        poder: 'Fogo',
        portador: 'Gandalf',
        forjadoPor: 'Elfos',
        imagem: 'http://example.com/narya.jpg'
      };

      jest.spyOn(anelRepo, 'count').mockResolvedValue(3);

      await expect(service.create(createAnelDto, 1)).rejects.toThrow(BadRequestException);
    });

    it('Deve retornar um BadRequestException se o campo forjadoPor for invalido', async () => {
      const createAnelDto: CreateAnelDto = {
        nome: 'Anel Inválido',
        poder: 'Poder Inválido',
        portador: 'Portador Inválido',
        forjadoPor: 'Criador Inválido',
        imagem: 'http://example.com/invalido.jpg'
      };

      await expect(service.create(createAnelDto, 1)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('Deve realizar um update no anel', async () => {
      const anel = new Anel();
      anel.id = 1;
      anel.nome = 'Narya';
      anel.poder = 'Fogo';
      anel.portador = 'Gandalf';
      anel.forjadoPor = 'Elfos';
      anel.imagem = 'http://example.com/narya.jpg';

      const updateAnelDto: UpdateAnelDto = { nome: 'Narya Atualizado' };

      jest.spyOn(service, 'findOneByUser').mockResolvedValue(anel);
      jest.spyOn(anelRepo, 'save').mockResolvedValue({ ...anel, ...updateAnelDto });

      const result = await service.update(1, updateAnelDto, 1);
      expect(result.nome).toBe('Narya Atualizado');
    });

    it('Deve retornar um NotFoundException se um anel não for encontrado', async () => {
      jest.spyOn(service, 'findOneByUser').mockRejectedValue(new NotFoundException());

      await expect(service.update(1, { nome: 'Teste' }, 1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('Deve remover um anel', async () => {
      const anel = new Anel();
      jest.spyOn(service, 'findOneByUser').mockResolvedValue(anel);
      jest.spyOn(anelRepo, 'remove').mockResolvedValue(anel);

      await expect(service.remove(1, 1)).resolves.not.toThrow();
    });

    it('Deve retornar um NotFoundException se um anel não for encontrado', async () => {
      jest.spyOn(service, 'findOneByUser').mockRejectedValue(new NotFoundException());

      await expect(service.remove(1, 1)).rejects.toThrow(NotFoundException);
    });
  });
});