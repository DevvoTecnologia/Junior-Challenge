"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRing = exports.updateRing = exports.getAllRings = exports.getRing = exports.saveRing = void 0;
const rings_1 = require("../db/rings");
const saveRing = async (req, res) => {
    try {
        const { ringname, description, carrier, forgedby, image } = req.body;
        if (!ringname || !description || !carrier || !forgedby || !image) {
            return res.sendStatus(400);
        }
        const ring = await (0, rings_1.createRing)({
            ringname,
            description,
            carrier,
            forgedby,
            image
        });
        return res.status(200).json(ring).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.saveRing = saveRing;
const getRing = async (req, res) => {
    try {
        const { id } = req.params;
        const ring = await (0, rings_1.getRingById)(id);
        return res.status(200).json(ring);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.getRing = getRing;
const getAllRings = async (req, res) => {
    try {
        const rings = await (0, rings_1.getRings)();
        return res.status(200).json(rings);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.getAllRings = getAllRings;
const updateRing = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!id) {
            return res.status(400).json({ message: 'ID do anel é obrigatório.' });
        }
        const updatedRing = await (0, rings_1.updateRingById)(id, updates);
        if (!updatedRing) {
            return res.status(404).json({ message: 'Anel não encontrado.' });
        }
        const ring = await (0, rings_1.getRingById)(id);
        return res.status(200).json(ring);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.updateRing = updateRing;
const deleteRing = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'ID do anel é obrigatório.' });
        }
        const deletedRing = await (0, rings_1.deleteRingById)(id);
        return res.json(deletedRing);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.deleteRing = deleteRing;
//# sourceMappingURL=rings.js.map