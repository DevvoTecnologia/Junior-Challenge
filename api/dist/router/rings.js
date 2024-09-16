"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rings_1 = require("../controllers/rings");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.get('/rings', middlewares_1.isAuthenticated, rings_1.getAllRings);
    router.post('/ring/create', middlewares_1.isAuthenticated, middlewares_1.countRingsForger, rings_1.saveRing);
    router.get('/ring/:id', middlewares_1.isAuthenticated, rings_1.getRing);
    router.patch('/ring/:id', middlewares_1.isAuthenticated, rings_1.updateRing);
    router.delete('/ring/:id', middlewares_1.isAuthenticated, rings_1.deleteRing);
};
//# sourceMappingURL=rings.js.map