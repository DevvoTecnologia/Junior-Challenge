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
exports.routes = routes;
const CreateCustomerController_1 = require("./controllers/CreateCustomerController");
const ListeCustomerController_1 = require("./controllers/ListeCustomerController");
const DeleteCustomerController_1 = require("./controllers/DeleteCustomerController");
const UpdateCustomerController_1 = require("./controllers/UpdateCustomerController");
const SearchCustomerController_1 = require("./controllers/SearchCustomerController");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Rota para criar um anel
        fastify.post("/createrings", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new CreateCustomerController_1.CreateCustomerController().handle(request, reply);
        }));
        // Rota para listar todos os anéis
        fastify.get("/allrings", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new ListeCustomerController_1.ListeCustomerController().handle(request, reply);
        }));
        // Rota para buscar um anel por nome
        fastify.get("/createrings/search", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new SearchCustomerController_1.SearchCustomerController().handle(request, reply);
        }));
        // Rota para deletar um anel por ID
        fastify.delete("/deleterings/:id", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new DeleteCustomerController_1.DeleteCustomerController().handle(request, reply);
        }));
        // Rota para atualizar um anel por ID
        fastify.put("/updaterings/:id", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new UpdateCustomerController_1.UpdateCustomerController().handle(request, reply);
        }));
    });
}
//# sourceMappingURL=routes.js.map