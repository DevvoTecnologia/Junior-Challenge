import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Portador from './Portador';

class Anel extends Model {
  public id!: number;
  public nome!: string;
  public poder!: string;
  public forjadoPor!: string;
  public imagem!: string;
  public portadorId!: number;
}

Anel.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  poder: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  forjadoPor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  portadorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Aneis',
});

export default Anel;
