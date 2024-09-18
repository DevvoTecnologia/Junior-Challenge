import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  getRing,
  getAllRings,
  createRing,
  updateRing,
  deleteRing,
} from '../../controllers/ringController';
import {
  getRingService,
  getAllRingsService,
  createRingService,
  updateRingService,
  deleteRingService,
} from '../../services/ringService';
import { getById } from '../../services/userService';

vi.mock('../../services/ringService', () => ({
  getRingService: vi.fn(),
  getAllRingsService: vi.fn(),
  createRingService: vi.fn(),
  updateRingService: vi.fn(),
  deleteRingService: vi.fn(),
  getAllRingsByBearerId: vi.fn(),
}));

vi.mock('../../middleware/authMiddleware', () => ({
  authenticate: vi.fn(),
}));

vi.mock('../../services/userService', () => ({
  getById: vi.fn(),
}));

interface RingParams {
  ringId: number;
}

interface CreateRingBody {
  name: string;
  power: string;
  bearer: string;
  forgedBy: string;
  image: string;
}

interface UpdateRingBody {
  name?: string;
  power?: string;
  bearer?: string;
}
interface MockFastifyReply extends FastifyReply {
  status: (code: number) => this;
  send: (body?: any) => this;
}
describe('Ring Controller', () => {
  let reply: FastifyReply;

  beforeEach(() => {
    reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      raw: {} as unknown,
      context: {},
      log: {} as unknown,
    } as unknown as MockFastifyReply;

    vi.clearAllMocks();
  });

  const createRequest = (
    params: RingParams,
    body: CreateRingBody | UpdateRingBody = {} as CreateRingBody | UpdateRingBody,
    user: { userId: string; class: string }
  ): FastifyRequest<{
    Params: RingParams;
    Body: CreateRingBody | UpdateRingBody;
  }> => {
    const request = {
      params,
      body,
      user,
      query: {},
      headers: {},
      raw: {} as any,
      id: '',
      log: {} as any,
      server: {} as any,
      context: {},
    };

    return request as unknown as FastifyRequest<{
      Params: RingParams;
      Body: CreateRingBody | UpdateRingBody;
    }>;
  };

  describe('getRing', () => {
    it('should return a ring by ID', async () => {
      const testUser = { userId: '550e8400-e29b-41d4-a716-446655440000', class: 'Elfo' };
      const request = createRequest({ ringId: 1 }, {}, testUser);
      const mockRing = { id: 1, name: 'Test Ring' };
      (getRingService as Mock).mockResolvedValue(mockRing);

      await getRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(200);
      expect(reply.send).toHaveBeenCalledWith(mockRing);
    });

    it('should return 404 if ring not found', async () => {
      const testUser = {
        userId: '550e8400-e29b-41d4-a716-446655440001',
        class: 'Humano',
      };
      const request = createRequest({ ringId: 1 }, {}, testUser);
      (getRingService as Mock).mockResolvedValue(null);

      await getRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(404);
      expect(reply.send).toHaveBeenCalledWith({ error: 'Ring not found' });
    });
  });

  describe('getAllRings', () => {
    it('should return all rings for authenticated user', async () => {
      const testUser = { userId: '550e8400-e29b-41d4-a716-446655440002', class: 'Anão' };
      const request = createRequest({ ringId: 1 }, {}, testUser);

      const mockRings = [
        { id: 1, name: 'Ring 1', userId: testUser.userId },
        { id: '2', name: 'Ring 2', userId: testUser.userId },
      ];

      (getAllRingsService as Mock).mockResolvedValue(mockRings);

      await getAllRings(request, reply);

      expect(reply.status).toHaveBeenCalledWith(200);
      expect(reply.send).toHaveBeenCalledWith(mockRings);
    });

    it('should return 401 if user is not authenticated', async () => {
      const request = createRequest({ ringId: 1 }, {}, { userId: '', class: '' });
      (request as any).user = undefined;

      await getAllRings(request, reply);

      expect(reply.status).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({ error: 'User not authenticated' });
    });
  });

  describe('createRing', () => {
    it('should create a new ring', async () => {
      const testUser = { userId: '550e8400-e29b-41d4-a716-446655440004', class: 'Elfo' };
      const request = createRequest(
        { ringId: 1 },
        {
          name: 'Test Ring',
          power: 'Invisibility',
          bearer: testUser.userId,
          forgedBy: testUser.userId,
        },
        testUser
      ) as FastifyRequest<{
        Body: {
          name: string;
          power: string;
          bearer: string;
          forgedBy: string;
          image: string;
        };
      }>;

      const mockRing = { id: 1, name: 'Test Ring', class: 'Elfo' };
      (createRingService as Mock).mockResolvedValue(mockRing);
      (getById as Mock).mockResolvedValue(testUser);

      await createRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(201);
      expect(reply.send).toHaveBeenCalledWith(mockRing);
    });

    it('should return 401 if user is not authenticated', async () => {
      const request = createRequest(
        { ringId: 1 },
        {},
        { userId: '', class: '' }
      ) as FastifyRequest<{
        Params: { ringId: number };
        Body: {
          name: string;
          forgedBy: string;
          power: string;
          bearer: string;
          image: string;
        };
      }>;
      (request as any).user = undefined;

      await createRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({ error: 'User not authenticated' });
    });
  });

  describe('updateRing', () => {
    it('should update a ring', async () => {
      const testUser = {
        userId: '550e8400-e29b-41d4-a716-446655440005',
        class: 'Humano',
      };
      const request = createRequest(
        { ringId: 1 },
        {
          name: 'Updated Ring',
          power: 'Updated Power',
          bearer: testUser.userId,
        },
        testUser
      ) as FastifyRequest<{
        Params: { ringId: number };
        Body: { name: string; power: string; bearer: string; image?: string | undefined };
      }>;

      const mockRing = { id: 1, bearer: testUser.userId };
      (getRingService as Mock).mockResolvedValue(mockRing);
      (updateRingService as Mock).mockResolvedValue(mockRing);

      await updateRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(200);
      expect(reply.send).toHaveBeenCalledWith(mockRing);
    });

    it('should return 404 if ring not found', async () => {
      const testUser = { userId: '550e8400-e29b-41d4-a716-446655440006', class: 'Anão' };
      const request = createRequest({ ringId: 1 }, {}, testUser) as FastifyRequest<{
        Params: { ringId: number };
        Body: { name: string; power: string; bearer: string; image?: string | undefined };
      }>;
      (getRingService as Mock).mockResolvedValue(null);

      await updateRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(404);
      expect(reply.send).toHaveBeenCalledWith({ error: 'Ring not found' });
    });

    it('should return 403 if user is not authorized', async () => {
      const testUser = { userId: '550e8400-e29b-41d4-a716-446655440007', class: 'Elfo' };
      const request = createRequest({ ringId: 1 }, {}, testUser) as FastifyRequest<{
        Params: { ringId: number };
        Body: { name: string; power: string; bearer: string; image?: string | undefined };
      }>;
      const mockRing = { id: 1, bearer: 'other-user' };
      (getRingService as Mock).mockResolvedValue(mockRing);

      await updateRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(403);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Unauthorized to perform this action',
      });
    });
  });

  describe('deleteRing', () => {
    it('should delete a ring', async () => {
      const testUser = {
        userId: '550e8400-e29b-41d4-a716-446655440008',
        class: 'Humano',
      };
      const request = createRequest({ ringId: 1 }, {}, testUser);
      const mockRing = { id: 1, bearer: testUser.userId };

      (getRingService as Mock).mockResolvedValue(mockRing);
      (deleteRingService as Mock).mockResolvedValue(undefined);

      await deleteRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(204);
      expect(reply.send).toHaveBeenCalled();
    });

    it('should return 404 if ring not found', async () => {
      const testUser = { userId: '550e8400-e29b-41d4-a716-446655440009', class: 'Anão' };
      const request = createRequest({ ringId: 1 }, {}, testUser);
      (getRingService as Mock).mockResolvedValue(null);

      await deleteRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(404);
      expect(reply.send).toHaveBeenCalledWith({ error: 'Ring not found' });
    });

    it('should return 403 if user is not authorized', async () => {
      const testUser = { userId: '550e8400-e29b-41d4-a716-446655440010', class: 'Elfo' };
      const request = createRequest({ ringId: 1 }, {}, testUser);
      const mockRing = { id: 1, bearer: 'other-user' };

      (getRingService as Mock).mockResolvedValue(mockRing);

      await deleteRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(403);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Unauthorized to perform this action',
      });
    });
  });
});
