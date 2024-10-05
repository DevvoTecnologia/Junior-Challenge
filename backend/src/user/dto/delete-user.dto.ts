import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class DeleteUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 255)
  @ApiProperty()
  public password!: string;
}
