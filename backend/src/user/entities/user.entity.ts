import * as bcrypt from "bcrypt";
import {
  BeforeSave,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

@Table
export class User extends Model {
  @Column({
    unique: true,
  })
  public username: string;

  @Column
  public passwordHash: string;

  @Column({
    type: DataType.VIRTUAL,
  })
  public password: string;

  @BeforeSave({ name: "hashPassword" })
  static async hashPassword(instance: User): Promise<void> {
    const newPassword = await bcrypt.hash(instance.password, 8);
    instance.passwordHash = newPassword;
  }

  async passwordIsValid(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.passwordHash);
  }
}