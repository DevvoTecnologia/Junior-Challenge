import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";

@Table
export class Ring extends Model {
  @Column
  public name!: string;

  @Column
  public power!: string;

  @Column
  public owner!: string;

  @Column
  public forgedBy!: string;

  @Column
  public image!: string;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      const url = process.env.IMAGES_URL ?? "http://localhost:3000/uploads";
      return `${url}/${this.getDataValue("image")}`;
    },
  })
  public url!: string;

  @ForeignKey(() => User)
  @Column
  public userId!: number;
}
