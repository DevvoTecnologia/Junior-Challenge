import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Portador extends Model {
  public id!: number;
  public nome!: string;
}

Portador.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Portadores',
});

export default Portador;
