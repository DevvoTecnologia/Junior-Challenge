"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const env = process.env.NODE_ENV || 'development';
dotenv_1.default.config({ path: env === 'test' ? '.testing.env' : '.env' });
const url = process.env.DB_URL || 'error';
const sequelize = new sequelize_1.Sequelize(url, { dialect: 'postgres', logging: false });
exports.default = sequelize;
