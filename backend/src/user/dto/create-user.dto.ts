import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
