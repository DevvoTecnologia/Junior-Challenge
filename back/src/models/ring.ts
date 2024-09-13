// models/Ring.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from './index';
import User from './user';

class Ring extends Model {
  declare id: number;
  declare name: string;
  declare power: string;
  declare bearer: string;
  declare forgedBy: string;
  declare image: string;
}

Ring.init(
  {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    power: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bearer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    forgedBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Rings',
  }
);

Ring.belongsTo(User, { foreignKey: 'forgedBy', as: 'forger' });
User.hasMany(Ring, { foreignKey: 'forgedBy', as: 'rings' });

export default Ring;
