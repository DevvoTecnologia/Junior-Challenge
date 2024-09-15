"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRingController = exports.updateRingController = exports.getAllRingsController = exports.createRingController = void 0;
const data_source_1 = __importDefault(require("../../db/data-source")); // Certifique-se de que o caminho está correto
const Ring_1 = require("../models/Ring");
const ringService_1 = require("../services/ringService");
const createRingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRing = yield (0, ringService_1.createRing)(req.body);
        res.status(201).json(newRing);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});
exports.createRingController = createRingController;
const getAllRingsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ringRepository = data_source_1.default.getRepository(Ring_1.Ring);
        const rings = yield ringRepository.find();
        res.json(rings);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllRingsController = getAllRingsController;
const updateRingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ringRepository = data_source_1.default.getRepository(Ring_1.Ring);
        const id = parseInt(req.params.id, 10); // Convertendo para número
        const ring = yield ringRepository.findOneBy({ id });
        if (!ring) {
            return res.status(404).json({ message: 'Ring not found' });
        }
        ringRepository.merge(ring, req.body);
        const result = yield ringRepository.save(ring);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.updateRingController = updateRingController;
const deleteRingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ringRepository = data_source_1.default.getRepository(Ring_1.Ring);
        const id = parseInt(req.params.id, 10); // Convertendo para número
        const result = yield ringRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Ring not found' });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteRingController = deleteRingController;
