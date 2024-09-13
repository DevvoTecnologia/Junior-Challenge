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
import { authenticate } from '../../middleware/authMiddleware';

vi.mock('../../services/ringService', () => ({
  getRingService: vi.fn(),
  getAllRingsService: vi.fn(),
  createRingService: vi.fn(),
  updateRingService: vi.fn(),
  deleteRingService: vi.fn(),
}));

vi.mock('../../middleware/authMiddleware', () => ({
  authenticate: vi.fn(),
}));

interface RingParams {
  ringId: string;
}

interface CreateRingBody {
  name: string;
  power: string;
  bearer: string;
  image?: string;
}

interface UpdateRingBody {
  name?: string;
  power?: string;
  bearer?: string;
}

describe('Ring Controller', () => {
  let reply: FastifyReply;

  const createRequest = (
    params: RingParams,
    body: CreateRingBody | UpdateRingBody = {} as CreateRingBody | UpdateRingBody,
    user?: { userId: string }
  ): FastifyRequest<{
    Params: RingParams;
    Body: CreateRingBody | UpdateRingBody;
  }> =>
    ({
      params,
      body,
      user: user || { userId: '550e8400-e29b-41d4-a716-446655440000' },
    }) as FastifyRequest<{
      Params: { ringId: string };
      Body: { name: string; power: string; bearer: string; image?: string | undefined };
    }>;

  beforeEach(() => {
    reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;

    vi.clearAllMocks();
  });

  describe('getRing', () => {
    it('should return a ring by ID', async () => {
      const request = createRequest({ ringId: '1' });
      const mockRing = { id: '1', name: 'Test Ring' };
      (getRingService as Mock).mockResolvedValue(mockRing);

      await getRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(200);
      expect(reply.send).toHaveBeenCalledWith(mockRing);
    });

    it('should return 404 if ring not found', async () => {
      const request = createRequest({ ringId: '1' });
      (getRingService as Mock).mockResolvedValue(null);

      await getRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(404);
      expect(reply.send).toHaveBeenCalledWith({ error: 'Ring not found' });
    });
  });

  describe('getAllRings', () => {
    it('should return all rings for authenticated user', async () => {
      const request = createRequest(
        { ringId: '1' },
        {},
        { userId: '550e8400-e29b-41d4-a716-446655440000' }
      );
      const mockRings = [
        { id: '1', name: 'Ring 1', userId: '550e8400-e29b-41d4-a716-446655440000' },
        { id: '2', name: 'Ring 2', userId: '550e8400-e29b-41d4-a716-446655440000' },
      ];

      (getAllRingsService as Mock).mockResolvedValue(mockRings);

      await getAllRings(request, reply);

      expect(reply.status).toHaveBeenCalledWith(200);
      expect(reply.send).toHaveBeenCalledWith(mockRings);
    });

    it('should return 401 if user is not authenticated', async () => {
      const request = createRequest({ ringId: '1' });
      request.user = undefined;

      await getAllRings(request, reply);

      expect(reply.status).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({ error: 'User not authenticated' });
    });

    it('should return 500 on error', async () => {
      const request = createRequest({ ringId: '1' });
      (getAllRingsService as Mock).mockRejectedValue(new Error('Error'));

      await getAllRings(request, reply);

      expect(reply.status).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('createRing', () => {
    it('should create a new ring', async () => {
      const request = createRequest(
        { ringId: '1' },
        {
          name: 'Test Ring',
          power: 'Invisibility',
          bearer: '550e8400-e29b-41d4-a716-446655440000',
        }
      ) as FastifyRequest<{
        Params: { ringId: string };
        Body: { name: string; power: string; bearer: string; image?: string | undefined };
      }>;

      const mockRing = { id: '1', name: 'Test Ring' };
      (createRingService as Mock).mockResolvedValue(mockRing);

      await createRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(201);
      expect(reply.send).toHaveBeenCalledWith(mockRing);
    });

    it('should return 400 if token error', async () => {
      const request = createRequest({ ringId: '1' }) as FastifyRequest<{
        Params: { ringId: string };
        Body: { name: string; power: string; bearer: string; image?: string | undefined };
      }>;
      request.user = undefined;

      await createRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(400);
      expect(reply.send).toHaveBeenCalledWith({ error: 'Token error' });
    });
  });

  describe('updateRing', () => {
    it('should update a ring', async () => {
      const request = createRequest(
        { ringId: '1' },
        {
          name: 'Updated Ring',
          power: 'Updated Power',
          bearer: '550e8400-e29b-41d4-a716-446655440000',
        },
        { userId: '550e8400-e29b-41d4-a716-446655440000' }
      ) as FastifyRequest<{
        Params: { ringId: string };
        Body: { name: string; power: string; bearer: string; image?: string | undefined };
      }>;

      const mockRing = { id: '1', bearer: '550e8400-e29b-41d4-a716-446655440000' };
      (getRingService as Mock).mockResolvedValue(mockRing);
      (updateRingService as Mock).mockResolvedValue(mockRing);

      await updateRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(200);
      expect(reply.send).toHaveBeenCalledWith(mockRing);
    });

    it('should return 404 if ring not found', async () => {
      const request = createRequest({ ringId: '1' }) as FastifyRequest<{
        Params: { ringId: string };
        Body: { name: string; power: string; bearer: string; image?: string | undefined };
      }>;
      (getRingService as Mock).mockResolvedValue(null);

      await updateRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(404);
      expect(reply.send).toHaveBeenCalledWith({ error: 'Ring not found' });
    });

    it('should return 401 if user is not authorized', async () => {
      const request = createRequest({ ringId: '1' }) as FastifyRequest<{
        Params: { ringId: string };
        Body: { name: string; power: string; bearer: string; image?: string | undefined };
      }>;
      const mockRing = { id: '1', bearer: 'other-user' };
      (getRingService as Mock).mockResolvedValue(mockRing);

      await updateRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });
  });

  describe('deleteRing', () => {
    it('should delete a ring', async () => {
      const request = createRequest({ ringId: '1' });
      const mockRing = { id: '1', bearer: '550e8400-e29b-41d4-a716-446655440000' };

      (getRingService as Mock).mockResolvedValue(mockRing);
      (deleteRingService as Mock).mockResolvedValue(undefined);

      await deleteRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(204);
      expect(reply.send).toHaveBeenCalled();
    });

    it('should return 404 if ring not found', async () => {
      const request = createRequest({ ringId: '1' });
      (getRingService as Mock).mockResolvedValue(null);

      await deleteRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(404);
      expect(reply.send).toHaveBeenCalledWith({ error: 'Ring not found' });
    });

    it('should return 401 if user is not authorized', async () => {
      const request = createRequest({ ringId: '1' });
      const mockRing = { id: '1', bearer: 'other-user' };

      (getRingService as Mock).mockResolvedValue(mockRing);

      await deleteRing(request, reply);

      expect(reply.status).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });
  });
});
