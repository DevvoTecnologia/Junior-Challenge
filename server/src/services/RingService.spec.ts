// src/services/__tests__/RingService.test.ts
import { RingService } from './RingService';
import { IRingRepository } from '../repositories/interfaces/IRingRepository';
import { ForgedBy, Ring } from '../entities/Ring';
import { CreateRingDTO } from '../dtos/CreateRingDTO';

describe('RingService', () => {
  let ringService: RingService;
  let ringRepository: jest.Mocked<IRingRepository>;

  beforeEach(() => {
    ringRepository = {
      countRingsByForgedBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneByOrFail: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<IRingRepository>;

    ringService = new RingService(ringRepository);
  });

  describe('create', () => {
    it('should create and save a ring if the limit is not reached', async () => {
      const createRingDTO: CreateRingDTO = {
        name: 'Anel do Poder',
        power: 'Invisibilidade',
        owner: 'Sauron',
        forgedBy: ForgedBy.MEN,
        image: 'image_url',
      };

      ringRepository.countRingsByForgedBy.mockResolvedValue(8);
      ringRepository.create.mockReturnValue({
        ...createRingDTO,
        id: '1',
      } as Ring);
      ringRepository.save.mockResolvedValue({
        ...createRingDTO,
        id: '1',
      } as Ring);

      const ring = await ringService.create(createRingDTO);

      expect(ringRepository.countRingsByForgedBy).toHaveBeenCalledWith(
        ForgedBy.MEN,
      );
      expect(ringRepository.create).toHaveBeenCalledWith(createRingDTO);
      expect(ringRepository.save).toHaveBeenCalledWith({
        ...createRingDTO,
        id: '1',
      });
      expect(ring).toEqual({ ...createRingDTO, id: '1' });
    });

    it('should throw an error if the limit for forgedBy is reached', async () => {
      const createRingDTO: CreateRingDTO = {
        name: 'Anel de Sauron',
        power: 'Controle',
        owner: 'Sauron',
        forgedBy: ForgedBy.SAURON,
        image: 'image_url',
      };

      ringRepository.countRingsByForgedBy.mockResolvedValue(1);

      await expect(ringService.create(createRingDTO)).rejects.toThrow(
        'Limite máximo de anéis para Sauron atingido.',
      );
    });
  });

  describe('list', () => {
    it('should return a list of rings', async () => {
      const rings = [{ id: '1', name: 'Anel do Poder' }] as Ring[];
      ringRepository.find.mockResolvedValue(rings);

      const result = await ringService.list();

      expect(ringRepository.find).toHaveBeenCalled();
      expect(result).toEqual(rings);
    });
  });

  describe('get', () => {
    it('should return a ring by id', async () => {
      const ring = { id: '1', name: 'Anel do Poder' } as Ring;
      ringRepository.findOneByOrFail.mockResolvedValue(ring);

      const result = await ringService.get('1');

      expect(ringRepository.findOneByOrFail).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(ring);
    });
  });

  describe('update', () => {
    it('should update a ring and return the updated ring', async () => {
      const ring = { id: '1', name: 'Anel do Poder' } as Ring;
      const updateData = { name: 'Novo Nome' };

      ringRepository.update.mockResolvedValue(undefined);
      ringRepository.findOneByOrFail.mockResolvedValue({
        ...ring,
        ...updateData,
      });

      const result = await ringService.update('1', updateData);

      expect(ringRepository.update).toHaveBeenCalledWith('1', updateData);
      expect(ringRepository.findOneByOrFail).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual({ ...ring, ...updateData });
    });
  });

  describe('delete', () => {
    it('should delete a ring by id', async () => {
      ringRepository.delete.mockResolvedValue(undefined);

      await ringService.delete('1');

      expect(ringRepository.delete).toHaveBeenCalledWith('1');
    });
  });
});
