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
exports.createRing = void 0;
const data_source_1 = __importDefault(require("../../db/data-source")); // Corrija o caminho se necessário
const Ring_1 = require("../models/Ring");
// Garantir que 'forjadoPor' não seja undefined
const createRing = (ringData) => __awaiter(void 0, void 0, void 0, function* () {
    const ringRepository = data_source_1.default.getRepository(Ring_1.Ring);
    const forjadoPor = ringData.forjadoPor;
    if (!forjadoPor) {
        throw new Error('O campo "forjadoPor" é obrigatório.');
    }
    // Verifique a quantidade de anéis antes de criar
    const ringsCount = yield ringRepository.count({ where: { forjadoPor } });
    const maxLimit = getMaxLimit(forjadoPor);
    if (ringsCount >= maxLimit) {
        throw new Error(`Limite de ${forjadoPor} anéis excedido.`);
    }
    const newRing = ringRepository.create(ringData);
    return yield ringRepository.save(newRing);
});
exports.createRing = createRing;
const getMaxLimit = (forjadoPor) => {
    switch (forjadoPor) {
        case 'Elfos': return 3;
        case 'Anões': return 7;
        case 'Homens': return 9;
        case 'Sauron': return 1;
        default: throw new Error('Categoria inválida');
    }
};
