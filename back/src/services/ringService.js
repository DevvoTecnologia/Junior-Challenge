"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRingsByBearerId = exports.getAllRingsService = exports.getRingService = exports.deleteRingService = exports.updateRingService = exports.createRingService = void 0;
const ring_1 = __importDefault(require("../models/ring"));
const createRingService = async (newRing) => {
    try {
        const createdRing = await ring_1.default.create(newRing, { returning: true });
        return createdRing;
    }
    catch (error) {
        throw new Error('Error creating ring in the database: ' + error);
    }
};
exports.createRingService = createRingService;
const updateRingService = async (updatedRing) => {
    const ring = await (0, exports.getRingService)(updatedRing.id);
    if (ring && ring.bearer !== updatedRing.bearer) {
        throw new Error('Not authorized');
    }
    await ring_1.default.update({
        name: updatedRing.name,
        power: updatedRing.power,
        bearer: updatedRing.bearer,
        image: updatedRing.image,
    }, { where: { id: updatedRing.id } });
    return await (0, exports.getRingService)(updatedRing.id);
};
exports.updateRingService = updateRingService;
const deleteRingService = async (id, bearerId) => {
    const ring = await ring_1.default.findOne({ where: { id } });
    if (!ring) {
        throw new Error('Ring not found');
    }
    if (ring.bearer !== bearerId) {
        throw new Error('Not authorized');
    }
    await ring_1.default.destroy({ where: { id } });
};
exports.deleteRingService = deleteRingService;
const getRingService = async (id) => {
    const ring = await ring_1.default.findOne({ where: { id } });
    return ring ? ring : null;
};
exports.getRingService = getRingService;
const getAllRingsService = async () => {
    return await ring_1.default.findAll();
};
exports.getAllRingsService = getAllRingsService;
const getAllRingsByBearerId = async (bearerId) => {
    const rings = await ring_1.default.findAll({
        where: {
            bearer: bearerId,
        },
    });
    return rings;
};
exports.getAllRingsByBearerId = getAllRingsByBearerId;
