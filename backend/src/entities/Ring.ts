import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import { RingAttributes } from "../@types/ring";

class Ring extends Model<RingAttributes> implements RingAttributes {
  public id!: number;
  public name!: string;
  public power!: string;
  public carrier!: string;
  public forgedBy!: "Elves" | "Dwarves" | "Men" | "Sauron";
  public image!: string;
}

Ring.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    power: { type: DataTypes.STRING, allowNull: false },
    carrier: { type: DataTypes.STRING, allowNull: false },
    forgedBy: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "rings",
  }
);

export default Ring;
