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
exports.DeleteCustomerController = void 0;
const DeleteCustomerService_1 = require("../services/DeleteCustomerService");
class DeleteCustomerController {
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const customerService = new DeleteCustomerService_1.DeleteCustomerService();
            try {
                yield customerService.excute({ id });
                reply.status(204).send();
            }
            catch (error) {
                console.error(error);
                reply.status(500).send("Erro ao deletar o anel.");
            }
        });
    }
}
exports.DeleteCustomerController = DeleteCustomerController;
//# sourceMappingURL=DeleteCustomerController.js.map