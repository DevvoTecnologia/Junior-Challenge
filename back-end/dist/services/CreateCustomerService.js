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
exports.CreateCustomerService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class CreateCustomerService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ imageURL, name, power, carrier, forger, info }) {
            if (!imageURL || !name || !power || !carrier || !forger || !info) {
                throw new Error("Preencha todos os campos");
            }
            // Definindo limites para cada tipo de forjador
            const ringLimits = {
                Elfos: 4,
                Anões: 8,
                Homens: 10,
                Sauron: 2,
            };
            // Contando o número de anéis existentes para o tipo de forjador
            const currentCount = yield prisma_1.default.customer.count({
                where: { forger },
            });
            const limit = ringLimits[forger];
            if (currentCount >= limit) {
                throw new Error(`Limite de criação de anéis para ${forger} excedido.`);
            }
            // Criando o novo anel
            const customer = yield prisma_1.default.customer.create({
                data: {
                    imageURL,
                    name,
                    power,
                    carrier,
                    forger,
                    info,
                    status: true,
                },
            });
            return customer;
        });
    }
}
exports.CreateCustomerService = CreateCustomerService;
//# sourceMappingURL=CreateCustomerService.js.map