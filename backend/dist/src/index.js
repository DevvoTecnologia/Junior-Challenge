"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = __importDefault(require("../db/data-source"));
const ringRoutes_1 = __importDefault(require("./routes/ringRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/api/rings', ringRoutes_1.default);
data_source_1.default.initialize()
    .then(() => {
    console.log('Database connected');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
    .catch(error => console.error('Error connecting to the database:', error));
