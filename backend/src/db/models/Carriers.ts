import { DataTypes, Model } from "sequelize";
import connection from "../../config/dbConnect";
import { CarriersAttributes, CarrierInput } from "types/Carriers";

class Carriers
	extends Model<CarriersAttributes, CarrierInput>
	implements CarriersAttributes
{
	public id!: string;
	public name!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Carriers.init(
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
	},

	{
		timestamps: true,
		sequelize: connection,
		underscored: false,
		modelName: "carriers",
	}
);

export default Carriers;
