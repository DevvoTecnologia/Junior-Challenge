import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './index';

interface RingModelAttributes {
  id?: number; // if you are using an auto-incrementing ID
  name: string; // translated from 'nome'
  power: string; // translated from 'poder'
  bearer: string; // translated from 'portador'
  forgedBy: string; // translated from 'forjadoPor'
  image?: string; // optional field translated from 'imagem'
}

interface RingModelCreationAttributes extends Optional<RingModelAttributes, 'id'> {}

class RingModel
  extends Model<RingModelAttributes, RingModelCreationAttributes>
  implements RingModelAttributes
{
  public id!: number;
  public name!: string;
  public power!: string;
  public bearer!: string;
  public forgedBy!: string;
  public image?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RingModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    power: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    bearer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    forgedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'url_of_default_image.png',
    },
  },
  {
    sequelize,
    modelName: 'RingModel',
    tableName: 'rings',
    timestamps: true,
  }
);

export default RingModel;
