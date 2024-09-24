import { DataTypes, Model } from "sequelize";
import connection from "../../config/dbConnect";
import { IRings, IRingInput } from "types/Rings";

class Rings extends Model<IRings, IRingInput> implements IRings {
	public id!: string;
	public name!: string;
	public power!: string;
	public carrier_id!: string;
	public forged_by!: string;
	public image!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Rings.init(
	{
		id: {
			allowNull: false,
			type: DataTypes.UUID,
			primaryKey: true,
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING(100),
		},
		power: {
			allowNull: false,
			type: DataTypes.TEXT,
		},
		carrier_id: {
			type: DataTypes.UUID,
		},
		forged_by: {
			allowNull: false,
			type: DataTypes.STRING(100),
		},
		image: {
			allowNull: false,
			type: DataTypes.STRING,
		},
	},

	{
		timestamps: true,
		sequelize: connection,
		underscored: false,
		modelName: "rings",
	}
);

export default Rings;
