import { Repository } from 'typeorm';
import { Owner } from '../../models/Owner';
import { Ring } from '../../models/Ring';
import { OwnerService } from '../../services/OwnerService';

describe('OwnerService', () => {
  let ownerService: OwnerService;
  let mockOwnerRepository: jest.Mocked<Repository<Owner>>;

  beforeEach(() => {
    mockOwnerRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    ownerService = new OwnerService(mockOwnerRepository);
  });

  describe('findOrCreateOwner', () => {
    it('should return existing owner if found', async () => {
      const existingOwner = { id: 1, name: 'Gandalf', rings: [] };
      mockOwnerRepository.findOne.mockResolvedValue(existingOwner);

      const result = await ownerService.findOrCreateOwner({ name: 'Gandalf' });

      expect(result).toEqual(existingOwner);
    });

    it('should create and return new owner if not found', async () => {
      const newOwner = { id: 2, name: 'Frodo', rings: [] };
      mockOwnerRepository.findOne.mockResolvedValue(null);
      mockOwnerRepository.create.mockReturnValue(newOwner);
      mockOwnerRepository.save.mockResolvedValue(newOwner);

      const result = await ownerService.findOrCreateOwner({ name: 'Frodo' });

      expect(result).toEqual(newOwner);
    });
  });

  describe('checkAndDeleteOwner', () => {
    it('should delete owner if they have no rings', async () => {
      const ownerWithNoRings = { id: 1, name: 'John Doe', rings: [] };
      mockOwnerRepository.findOne.mockResolvedValue(ownerWithNoRings);

      await ownerService.checkAndDeleteOwner(1);

      expect(mockOwnerRepository.remove).toHaveBeenCalledWith(ownerWithNoRings);
    });

    it('should not delete owner if they have rings', async () => {
      const ring: Ring = {
        id: 1,
        name: 'The One Ring',
        power: 'Control over other rings',
        forgedBy: 'Sauron',
        image: 'https://example.com/one-ring.jpg',
        currentOwner: null,
      };

      const ownerWithRings: Owner = {
        id: 1,
        name: 'Frodo Baggins',
        rings: [ring],
      };

      mockOwnerRepository.findOne.mockResolvedValue(ownerWithRings);

      await ownerService.checkAndDeleteOwner(1);

      expect(mockOwnerRepository.remove).not.toHaveBeenCalled();
    });

    it('should do nothing if owner is not found', async () => {
      mockOwnerRepository.findOne.mockResolvedValue(null);

      await ownerService.checkAndDeleteOwner(1);

      expect(mockOwnerRepository.remove).not.toHaveBeenCalled();
    });
  });
});
