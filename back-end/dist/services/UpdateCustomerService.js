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
exports.UpdateCustomerService = void 0;
// services/UpdateCustomerService.ts
const client_1 = require("@prisma/client");
class UpdateCustomerService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedAnel = yield this.prisma.customer.update({
                    where: { id }, // Atualiza com base no ID
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
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const anel = yield this.prisma.customer.findUnique({
                    where: { id },
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
exports.UpdateCustomerService = UpdateCustomerService;
//# sourceMappingURL=UpdateCustomerService.js.map