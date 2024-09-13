import { Model, DataTypes, Sequelize } from "sequelize";

export interface UserAttributes {
  id: string;
  username: string;
  password: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public password!: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "User",
      }
    );
  }
}