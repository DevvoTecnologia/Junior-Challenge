import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @ApiProperty()
  public username!: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 255)
  @ApiProperty()
  public password!: string;
}
