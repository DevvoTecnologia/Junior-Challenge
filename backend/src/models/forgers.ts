import { DataTypes } from "sequelize";

import { connection } from "../database/database";
import { Rings } from "./rings";

export const Forgers = connection.define(
  "Forgers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maximumNumberRings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantityForgedRings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "forgers",
    timestamps: false,
  }
);

(async () => {
  try {
    await connection.sync({ alter: true });

    const forgeCount = await Forgers.count();
    if (forgeCount === 0) {
      await Forgers.bulkCreate([
        { id: 1, name: "Elfo", maximumNumberRings: 3, quantityForgedRings: 0 },
        { id: 2, name: "Anões", maximumNumberRings: 7, quantityForgedRings: 0 },
        {
          id: 3,
          name: "Homens",
          maximumNumberRings: 9,
          quantityForgedRings: 0,
        },
        {
          id: 4,
          name: "Sauron",
          maximumNumberRings: 1,
          quantityForgedRings: 0,
        },
      ]);
    }
  } catch (error) {
    console.error(
      "Erro ao sincronizar o banco de dados ou iniciar o servidor:",
      error
    );
  }
})();

Forgers.hasMany(Rings);
Rings.belongsTo(Forgers);
