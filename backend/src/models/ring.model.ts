import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Anel extends Model {
    public id!: number;
    public nome!: string;
    public poder!: string;
    public portador!: string;
    public forjadoPor!: string;
    public imagem!: string;
}

Anel.init(
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        poder: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        portador: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        forjadoPor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagem: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },

    {
        sequelize,
        modelName: "Anel",
        timestamps: false,
    }
);