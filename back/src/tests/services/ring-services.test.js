"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ring_1 = __importDefault(require("../../models/ring"));
const ringService_1 = require("../../services/ringService");
vitest_1.vi.mock('../../models/ring', () => ({
    __esModule: true,
    default: {
        create: vitest_1.vi.fn().mockResolvedValue({
            id: 1,
            name: 'Test Ring',
            power: 'Invisibility',
            bearer: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
            forgedBy: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
        }),
        findOne: vitest_1.vi.fn(),
        update: vitest_1.vi.fn(),
        destroy: vitest_1.vi.fn(),
        findAll: vitest_1.vi.fn(),
    },
}));
(0, vitest_1.describe)('Ring Service', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)('should create a ring', async () => {
        const result = await (0, ringService_1.createRingService)({
            name: 'Test Ring',
            power: 'Invisibility',
            bearer: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
            forgedBy: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
        });
        (0, vitest_1.expect)(result).toEqual({
            name: 'Test Ring',
            power: 'Invisibility',
            bearer: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
            forgedBy: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
            id: 1,
        });
        (0, vitest_1.expect)(ring_1.default.create).toHaveBeenCalledWith({
            name: 'Test Ring',
            power: 'Invisibility',
            bearer: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
            forgedBy: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
            image: undefined,
        }, { returning: true });
    });
    (0, vitest_1.it)('should throw an error when creating a ring fails', async () => {
        ring_1.default.create.mockRejectedValue(new Error('Database error'));
        await (0, vitest_1.expect)((0, ringService_1.createRingService)({
            name: 'Test Ring',
            power: 'Invisibility',
            bearer: 'user-uuid',
            forgedBy: 'user-uuid',
        })).rejects.toThrow('Error creating ring in the database: Error: Database error');
    });
    (0, vitest_1.it)('should update a ring', async () => {
        const mockRing = {
            id: 1,
            name: 'Old Ring',
            power: 'Old Power',
            bearer: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
            forgedBy: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
            image: undefined,
        };
        ring_1.default.findOne.mockResolvedValue(mockRing);
        ring_1.default.update.mockResolvedValue([1]);
        const result = await (0, ringService_1.updateRingService)({
            id: 1,
            name: 'New Ring',
            power: 'New Power',
            bearer: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
        });
        (0, vitest_1.expect)(result).toEqual(mockRing);
        (0, vitest_1.expect)(ring_1.default.update).toHaveBeenCalledWith({
            name: 'New Ring',
            power: 'New Power',
            bearer: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
        }, { where: { id: 1 } });
    });
    (0, vitest_1.it)('should throw an error if not authorized to update', async () => {
        const mockRing = {
            id: 1,
            name: 'Old Ring',
            power: 'Old Power',
            bearer: 'other',
            forgedBy: 'other-user-id',
        };
        ring_1.default.findOne.mockResolvedValue(mockRing);
        await (0, vitest_1.expect)((0, ringService_1.updateRingService)({
            id: 1,
            name: 'Old Ring',
            power: 'Old Power',
            bearer: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
        })).rejects.toThrow('Not authorized');
    });
    (0, vitest_1.it)('should delete a ring', async () => {
        const mockRing = {
            id: 1,
            name: 'Test Ring',
            power: 'Invisibility',
            bearer: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
        };
        ring_1.default.findOne.mockResolvedValue(mockRing);
        ring_1.default.destroy.mockResolvedValue(1);
        await (0, ringService_1.deleteRingService)(1, '6e6a460b-dd38-4cb5-b93d-103a7239149c');
        (0, vitest_1.expect)(ring_1.default.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    (0, vitest_1.it)('should throw an error if ring to delete is not found', async () => {
        ring_1.default.findOne.mockResolvedValue(null);
        await (0, vitest_1.expect)((0, ringService_1.deleteRingService)(1, 'user-uuid')).rejects.toThrow('Ring not found');
    });
    (0, vitest_1.it)('should throw an error if not authorized to delete', async () => {
        const mockRing = {
            id: 1,
            name: 'Test Ring',
            power: 'Invisibility',
            bearer: 'other-user',
        };
        ring_1.default.findOne.mockResolvedValue(mockRing);
        await (0, vitest_1.expect)((0, ringService_1.deleteRingService)(1, 'user-uuid')).rejects.toThrow('Not authorized');
    });
    (0, vitest_1.it)('should get a ring by ID', async () => {
        const mockRing = {
            id: 1,
            name: 'Test Ring',
            power: 'Invisibility',
            bearer: 'user-uuid',
            forgedBy: 'user-uuid',
        };
        ring_1.default.findOne.mockResolvedValue(mockRing);
        const result = await (0, ringService_1.getRingService)(1);
        (0, vitest_1.expect)(result).toEqual(mockRing);
    });
    (0, vitest_1.it)('should throw an error when getting a ring fails', async () => {
        ring_1.default.findOne.mockRejectedValue(new Error('Database error'));
        await (0, vitest_1.expect)((0, ringService_1.getRingService)(1)).rejects.toThrow('Database error');
    });
    (0, vitest_1.it)('should get all rings', async () => {
        const mockRings = [
            {
                id: 1,
                name: 'Ring 1',
                power: 'Power 1',
                bearer: 'user-uuid',
                forgedBy: 'user-uuid',
            },
            {
                id: '2',
                name: 'Ring 2',
                power: 'Power 2',
                bearer: 'user-uuid',
                forgedBy: 'user-uuid',
            },
        ];
        ring_1.default.findAll.mockResolvedValue(mockRings);
        const result = await (0, ringService_1.getAllRingsService)();
        (0, vitest_1.expect)(result).toEqual(mockRings);
    });
});
