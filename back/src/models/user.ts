// models/User.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from './index';
import { UUID } from 'crypto';

class User extends Model {
  declare id: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare ringsWorn: string[];
  declare ringsForged: string[] | null;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ringsWorn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ringsForged: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;
