"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.isOwner = exports.countRingsForger = void 0;
const lodash_1 = require("lodash");
const users_1 = require("../db/users");
const rings_1 = require("../db/rings");
const maxRings = {
    'Elfos': 3,
    'Anões': 7,
    'Homens': 9,
    'Sauron': 1
};
const countRingsForger = async (req, res, next) => {
    try {
        const { forgedby } = req.body;
        const existingRingsCount = await rings_1.RingModel.countDocuments({ forgedby });
        if (existingRingsCount >= maxRings[forgedby]) {
            return res.status(400).json({
                message: `O limite de anéis forjados por ${forgedby} já foi atingido!`
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.countRingsForger = countRingsForger;
const isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentUserId = (0, lodash_1.get)(req, 'identity[0]._id');
        if (!currentUserId) {
            return res.sendStatus(403);
        }
        if (currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.isOwner = isOwner;
const isAuthenticated = async (req, res, next) => {
    try {
        console.log('Cookies received:', req.cookies);
        const sessionToken = req.cookies['LOTR-AUTH'];
        console.log('Session Token:', sessionToken);
        if (!sessionToken) {
            return res.sendStatus(403);
        }
        const existingUser = await (0, users_1.getUserBySessionToken)(sessionToken);
        if (!existingUser) {
            return res.sendStatus(403);
        }
        (0, lodash_1.merge)(req, { identity: existingUser });
        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=index.js.map