import { Column, Model, Table } from "sequelize-typescript";

@Table
export class User extends Model {
  @Column({
    unique: true,
  })
  public username: string;

  @Column
  public password: string;
}
