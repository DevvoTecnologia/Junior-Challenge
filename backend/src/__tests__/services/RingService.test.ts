import { Repository } from 'typeorm';
import { Owner } from '../../models/Owner';
import { Ring } from '../../models/Ring';
import { OwnerService } from '../../services/OwnerService';
import { RingService } from '../../services/RingService';
import { ConflictError, NotFoundError } from '../../utils/errors';
import { RING_MOCK } from '../models/Ring.test';

describe('RingService', () => {
  let ringService: RingService;
  let mockRingRepository: jest.Mocked<Repository<Ring>>;
  let mockOwnerService: jest.Mocked<OwnerService>;

  beforeEach(() => {
    mockRingRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      count: jest.fn(),
      remove: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    mockOwnerService = {
      findOrCreateOwner: jest.fn(),
      checkAndDeleteOwner: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    ringService = new RingService(mockRingRepository, mockOwnerService);
  });

  describe('createRingWithOwner', () => {
    it('should create a ring with owner when limit is not reached', async () => {
      const ownerData = { name: 'Sauron' };
      const owner = { id: 1, name: 'Sauron', rings: [] };
      const createdRing = { ...RING_MOCK, id: 1, currentOwner: owner };

      mockRingRepository.count.mockResolvedValue(0);
      mockOwnerService.findOrCreateOwner.mockResolvedValue(owner);
      mockRingRepository.create.mockReturnValue(createdRing);
      mockRingRepository.save.mockResolvedValue(createdRing);

      const result = await ringService.createRingWithOwner(RING_MOCK, ownerData);

      expect(mockRingRepository.save).toHaveBeenCalledWith(createdRing);
      expect(result).toEqual(createdRing);
    });

    it('should throw ConflictError when ring limit is reached', async () => {
      const ownerData = { name: 'Sauron' };

      mockRingRepository.count.mockResolvedValue(1);

      await expect(ringService.createRingWithOwner(RING_MOCK, ownerData)).rejects.toThrow(
        ConflictError,
      );
    });
  });

  describe('getAllRings', () => {
    it('should return all rings with their owners', async () => {
      const rings = [
        { ...RING_MOCK, id: 1, currentOwner: { id: 1, name: 'Gandalf' } },
        { ...RING_MOCK, id: 2, currentOwner: { id: 2, name: 'Sauron' } },
      ] as Ring[];

      mockRingRepository.find.mockResolvedValue(rings);

      const result = await ringService.getAllRings();

      expect(result).toEqual(rings);
    });
  });

  describe('updateRing', () => {
    it('should update ring and owner', async () => {
      const ringId = 1;
      const updatedRingData = {
        name: 'Narya',
        power: 'Fogo',
        forgedBy: 'Elfos' as const,
        image: 'https://example.com/narya.jpg',
      };
      const updatedOwnerData = { name: 'Frodo' };
      const newOwner = { id: 2, name: 'Frodo', rings: [] };

      const finalUpdatedRing = {
        id: ringId,
        ...updatedRingData,
        currentOwner: newOwner,
      };

      const existingRing = {
        id: ringId,
        ...RING_MOCK,
        currentOwner: { id: 1, name: 'Sauron', rings: [] },
      };

      mockRingRepository.findOne.mockResolvedValue(existingRing);
      mockRingRepository.count.mockResolvedValue(0);
      mockOwnerService.findOrCreateOwner.mockResolvedValue(newOwner);
      mockRingRepository.save.mockResolvedValue(finalUpdatedRing);

      const result = await ringService.updateRing(ringId, updatedRingData, updatedOwnerData);
      expect(result).toEqual(finalUpdatedRing);
    });

    it('should throw NotFoundError when ring is not found', async () => {
      mockRingRepository.findOne.mockResolvedValue(null);

      await expect(ringService.updateRing(1, {} as Ring, {} as Owner)).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe('deleteRing', () => {
    it('should delete ring and check owner for deletion', async () => {
      const ringId = 1;
      const ring = {
        id: ringId,
        name: 'Narya',
        power: 'Fire',
        forgedBy: 'Elfos' as const,
        image: 'narya.jpg',
        currentOwner: { id: 1, name: 'Gandalf', rings: [] },
      };

      mockRingRepository.findOne.mockResolvedValue(ring);

      await ringService.deleteRing(ringId);

      expect(mockRingRepository.remove).toHaveBeenCalledWith(ring);
      expect(mockOwnerService.checkAndDeleteOwner).toHaveBeenCalledWith(ring.currentOwner.id);
    });

    it('should throw NotFoundError when ring is not found', async () => {
      mockRingRepository.findOne.mockResolvedValue(null);

      await expect(ringService.deleteRing(1)).rejects.toThrow(NotFoundError);
    });
  });
});
