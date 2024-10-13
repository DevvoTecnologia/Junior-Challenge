import * as bcrypt from "bcrypt";
import {
  BeforeSave,
  Column,
  DataType,
  HasMany,
  IsEmail,
  Model,
  Table,
} from "sequelize-typescript";
import { Ring } from "src/ring/entities/ring.entity";

@Table
export class User extends Model {
  @Column
  public username!: string;

  @IsEmail
  @Column({
    unique: true,
    type: DataType.STRING,
  })
  public email!: string | null;

  @Column({
    type: DataType.STRING,
  })
  public passwordHash!: string | null;

  @Column({
    type: DataType.VIRTUAL,
  })
  public password!: string;

  @Column({
    allowNull: false,
  })
  public canSignWithEmailAndPassword!: boolean;

  @Column({
    type: DataType.STRING,
  })
  public githubUserId!: string | null;

  @BeforeSave({ name: "hashPassword" })
  static async hashPassword(instance: User): Promise<void> {
    // Only hash the password if it has been set
    if (instance.password) {
      const newPassword = await bcrypt.hash(instance.password, 8);
      instance.passwordHash = newPassword;
    }
  }

  async passwordIsValid(password: string): Promise<boolean> {
    if (!this.passwordHash) {
      return false;
    }
    const compare = await bcrypt.compare(password, this.passwordHash);
    return compare;
  }

  @HasMany(() => Ring, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  public rings!: Ring[];
}
