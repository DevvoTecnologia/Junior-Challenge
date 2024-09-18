"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRing = exports.updateRing = exports.createRing = exports.getAllRings = exports.getRing = void 0;
const ringService_1 = require("../services/ringService");
const authMiddleware_1 = require("../middleware/authMiddleware");
const userService_1 = require("../services/userService");
const checkAuthentication = async (request, reply) => {
    await (0, authMiddleware_1.authenticate)(request, reply);
    const reqUser = request.user;
    if (!reqUser) {
        reply.status(401).send({ error: 'User not authenticated' });
        return null;
    }
    return reqUser;
};
const checkRingExists = async (ringId, reply) => {
    const ring = await (0, ringService_1.getRingService)(ringId);
    if (!ring) {
        return null;
    }
    return ring;
};
const checkPermission = (ring, reqUser, reply) => {
    if (ring.bearer !== reqUser.userId) {
        return false;
    }
    return true;
};
const checkPortedRings = async (bearerId) => {
    const user = await (0, userService_1.getById)(bearerId);
    if (!user) {
        throw new Error('User not found');
    }
    const rings = (await (0, ringService_1.getAllRingsByBearerId)(bearerId)) || [];
    let limit = 0;
    switch (user.class) {
        case 'Elfo':
            limit = 3;
            break;
        case 'Anão':
            limit = 7;
            break;
        case 'Homem':
            limit = 9;
            break;
        case 'Sauron':
            limit = 1;
            break;
        default:
            throw new Error('Raça desconhecida');
    }
    if (rings.length >= limit) {
        throw new Error(`${user.class} pode ter no máximo ${limit} anéis. Você possui ${rings.length}.`);
    }
};
const getRing = async (request, reply) => {
    const { ringId } = request.params;
    try {
        const ring = await checkRingExists(ringId, reply);
        if (!ring)
            return reply.status(404).send({ error: 'Ring not found' });
        return reply.status(200).send(ring);
    }
    catch (error) {
        return reply.status(500).send(error);
    }
};
exports.getRing = getRing;
const getAllRings = async (request, reply) => {
    const reqUser = await checkAuthentication(request, reply);
    if (!reqUser)
        return reply.status(403).send({ error: 'Not Authorized' });
    try {
        const rings = await (0, ringService_1.getAllRingsService)();
        return reply.status(200).send(rings);
    }
    catch (error) {
        return reply.status(500).send(error);
    }
};
exports.getAllRings = getAllRings;
const createRing = async (request, reply) => {
    try {
        const reqUser = await checkAuthentication(request, reply);
        if (!reqUser)
            return reply.status(403).send({ error: 'Not Authorized' });
        await checkPortedRings(reqUser.userId);
        const newRing = await (0, ringService_1.createRingService)({
            ...request.body,
            forgedBy: reqUser.userId,
        });
        return reply.status(201).send(newRing);
    }
    catch (error) {
        return reply.status(400).send({ error: error.message });
    }
};
exports.createRing = createRing;
const updateRing = async (request, reply) => {
    const { ringId } = request.params;
    try {
        const ring = await checkRingExists(ringId, reply);
        if (!ring)
            return reply.status(404).send({ error: 'Ring not found' });
        const reqUser = await checkAuthentication(request, reply);
        if (!reqUser)
            return reply.status(403).send({ error: 'Not Authorized' });
        if (!checkPermission(ring, reqUser, reply))
            return reply.status(403).send({ error: 'Unauthorized to perform this action' });
        const updatedRing = await (0, ringService_1.updateRingService)({
            ...request.body,
            id: Number(ringId),
        });
        return reply.status(200).send(updatedRing);
    }
    catch (error) {
        return reply.status(500).send(error);
    }
};
exports.updateRing = updateRing;
const deleteRing = async (request, reply) => {
    const { ringId } = request.params;
    try {
        const ring = await checkRingExists(ringId, reply);
        if (!ring)
            return reply.status(404).send({ error: 'Ring not found' });
        const reqUser = await checkAuthentication(request, reply);
        if (!reqUser)
            return reply.status(403).send({ error: 'Not Authorized' });
        if (!checkPermission(ring, reqUser, reply))
            return reply.status(403).send({ error: 'Unauthorized to perform this action' });
        await (0, ringService_1.deleteRingService)(ring.id, reqUser.userId);
        return reply.status(204).send({});
    }
    catch (error) {
        return reply.status(500).send(error);
    }
};
exports.deleteRing = deleteRing;
