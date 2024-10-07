import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'rings',
  timestamps: false,
})
export class Ring extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ring_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ring_power!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ring_carrier!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ring_forged_by!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ring_image_url!: string;
}