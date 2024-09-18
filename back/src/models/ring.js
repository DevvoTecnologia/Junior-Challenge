"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const user_1 = __importDefault(require("./user"));
class Ring extends sequelize_1.Model {
}
Ring.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    power: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    bearer: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
    },
    forgedBy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: index_1.default,
    tableName: 'Rings',
});
Ring.belongsTo(user_1.default, { foreignKey: 'bearer', as: 'owner' });
exports.default = Ring;
