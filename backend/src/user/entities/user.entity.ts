import { Column, Model, Table } from "sequelize-typescript";

@Table
export class User extends Model {
  @Column
  public username: string;

  @Column
  public password: string;
}
