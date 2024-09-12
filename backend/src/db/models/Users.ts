import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";
import { UserInput, UsersAttributes } from "types/Users";

class Users
	extends Model<UsersAttributes, UserInput>
	implements UsersAttributes
{
	public id!: string;
	public name!: string;
	public password!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}
Users.init(
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
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},

	{
		timestamps: true,
		sequelize: connection,
		underscored: false,
		modelName: "users",
	}
);

export default Users;
