"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const authUtils_1 = require("../utils/authUtils");
const authenticate = async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return reply.code(401).send({ error: 'Authorization header is missing' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return reply.code(401).send({ error: 'Token is missing' });
    }
    try {
        const decoded = (0, authUtils_1.verifyToken)(token);
        if (!decoded || !decoded.userId) {
            return reply.code(401).send({ error: 'Invalid token' });
        }
        request.user = decoded;
    }
    catch (err) {
        return reply.code(401).send({ error: 'Token Unauthorized' });
    }
};
exports.authenticate = authenticate;
