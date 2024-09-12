import { Model, DataTypes, Sequelize } from "sequelize";
import { RingAttributes } from "../types/ring";

export class Ring extends Model<RingAttributes> implements RingAttributes {
	public id!: string;
	public name!: string;
	public power!: string;
	public bearer!: string;
	public forgedBy!: "Elfos" | "Anões" | "Homens" | "Sauron";
	public image!: string;

	public static initialize(sequelize: Sequelize) {
		this.init(
			{
				id: {
					type: DataTypes.STRING,
					primaryKey: true,
					allowNull: false,
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
					type: DataTypes.ENUM("Elfos", "Anões", "Homens", "Sauron"),
					allowNull: false,
				},
				image: {
					type: DataTypes.STRING,
					allowNull: false,
				},
			},
			{
				sequelize,
				modelName: "Ring",
			},
		);
	}
}
