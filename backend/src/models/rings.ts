import { DataTypes } from "sequelize";

import { connection } from "../database/database";

export const Rings = connection.define("rings", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  power: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Rings.sync({ force: false });
