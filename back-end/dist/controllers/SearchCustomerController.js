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
exports.SearchCustomerController = void 0;
const SearchCustomerService_1 = require("../services/SearchCustomerService"); // Atualize o nome do serviço se necessário
class SearchCustomerController {
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = request.query; // Recebe o nome da query
            const customerService = new SearchCustomerService_1.SurchCustomerService();
            try {
                // Verifique se o anel existe
                const existingAnel = yield customerService.findByName(name);
                if (!existingAnel) {
                    return reply.status(404).send({ message: 'Anel não encontrado.' });
                }
                reply.send(existingAnel);
            }
            catch (error) {
                if (error instanceof Error) {
                    reply.status(500).send({ message: error.message || 'Erro ao buscar o anel.' });
                }
                else {
                    reply.status(500).send({ message: 'Erro desconhecido ao buscar o anel.' });
                }
            }
        });
    }
}
exports.SearchCustomerController = SearchCustomerController;
//# sourceMappingURL=SearchCustomerController.js.map