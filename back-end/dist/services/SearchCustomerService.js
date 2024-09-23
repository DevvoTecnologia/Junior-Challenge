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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurchCustomerService = void 0;
// services/SurchCustomerService.ts
const client_1 = require("@prisma/client");
class SurchCustomerService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    update(name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedAnel = yield this.prisma.customer.update({
                    where: { name },
                    data: Object.assign(Object.assign({}, data), { updated_at: new Date() }),
                });
                return updatedAnel;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message || 'Erro ao atualizar o anel.');
                }
                else {
                    throw new Error('Erro desconhecido ao atualizar o anel.');
                }
            }
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const anel = yield this.prisma.customer.findUnique({
                    where: { name },
                });
                if (!anel) {
                    throw new Error('Anel não encontrado.');
                }
                return anel;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message || 'Erro ao buscar o anel.');
                }
                else {
                    throw new Error('Erro desconhecido ao buscar o anel.');
                }
            }
        });
    }
}
exports.SurchCustomerService = SurchCustomerService;
//# sourceMappingURL=SearchCustomerService.js.map