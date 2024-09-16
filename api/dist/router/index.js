"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("./authentication"));
const users_1 = __importDefault(require("./users"));
const rings_1 = __importDefault(require("./rings"));
const router = express_1.default.Router();
exports.default = () => {
    (0, authentication_1.default)(router);
    (0, users_1.default)(router);
    (0, rings_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map