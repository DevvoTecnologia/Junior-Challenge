import { Test, TestingModule } from '@nestjs/testing';
import { AneisService } from './aneis.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anel } from './anel.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateAnelDto, UpdateAnelDto } from './dto/anel.dto';

describe('AneisService', () => {
  let service: AneisService;
  let repo: Repository<Anel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AneisService,
        {
          provide: getRepositoryToken(Anel),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AneisService>(AneisService);
    repo = module.get<Repository<Anel>>(getRepositoryToken(Anel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of aneis', async () => {
      const result = [new Anel()];
      jest.spyOn(repo, 'find').mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return an anel', async () => {
      const result = new Anel();
      jest.spyOn(repo, 'findOne').mockResolvedValue(result);

      expect(await service.findOne(1)).toEqual(result);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should successfully create an anel', async () => {
      const createAnelDto: CreateAnelDto = {
        nome: 'Narya',
        poder: 'Fogo',
        portador: 'Gandalf',
        forjadoPor: 'Elfos',
        imagem: 'http://example.com/narya.jpg'
      };
      const newAnel = new Anel();
      Object.assign(newAnel, createAnelDto);

      jest.spyOn(repo, 'count').mockResolvedValue(0);
      jest.spyOn(repo, 'create').mockReturnValue(newAnel);
      jest.spyOn(repo, 'save').mockResolvedValue(newAnel);

      const result = await service.create(createAnelDto);
      expect(result).toEqual(newAnel);
    });

    it('should throw BadRequestException if limit is exceeded', async () => {
      const createAnelDto: CreateAnelDto = {
        nome: 'Narya',
        poder: 'Fogo',
        portador: 'Gandalf',
        forjadoPor: 'Elfos',
        imagem: 'http://example.com/narya.jpg'
      };

      jest.spyOn(repo, 'count').mockResolvedValue(3);

      await expect(service.create(createAnelDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for invalid forjadoPor', async () => {
      const createAnelDto: CreateAnelDto = {
        nome: 'Anel Inválido',
        poder: 'Poder Inválido',
        portador: 'Portador Inválido',
        forjadoPor: 'Criador Inválido',
        imagem: 'http://example.com/invalido.jpg'
      };

      jest.spyOn(repo, 'count').mockResolvedValue(0);

      await expect(service.create(createAnelDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update an anel', async () => {
      const anel = new Anel();
      anel.id = 1;
      anel.nome = 'Narya';
      anel.poder = 'Fogo';
      anel.portador = 'Gandalf';
      anel.forjadoPor = 'Elfos';
      anel.imagem = 'http://example.com/narya.jpg';

      const updateAnelDto: UpdateAnelDto = { nome: 'Narya Atualizado' };

      jest.spyOn(repo, 'findOne').mockResolvedValue(anel);
      jest.spyOn(repo, 'save').mockResolvedValue({ ...anel, ...updateAnelDto });

      const result = await service.update(1, updateAnelDto);
      expect(result.nome).toBe('Narya Atualizado');
    });

    it('should throw NotFoundException if anel not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, { nome: 'Teste' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an anel', async () => {
      const anel = new Anel();
      jest.spyOn(repo, 'findOne').mockResolvedValue(anel);
      jest.spyOn(repo, 'remove').mockResolvedValue(undefined);

      await expect(service.remove(1)).resolves.not.toThrow();
    });

    it('should throw NotFoundException if anel not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});