import { DataTypes } from "sequelize";

import { connection } from "../database/database";

export const Users = connection.define("users", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.sync({ force: false });
