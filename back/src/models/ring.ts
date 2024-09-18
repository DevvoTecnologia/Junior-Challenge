import { Model, DataTypes } from 'sequelize';
import sequelize from './index';
import User from './user';

class Ring extends Model {
  declare id: number;
  declare name: string;
  declare power: string;
  declare bearer: string;
  declare forgedBy: string;
  declare image: string | null;
}

Ring.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    },
    forgedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Rings',
  }
);

Ring.belongsTo(User, { foreignKey: 'bearer', as: 'owner' });

export default Ring;
