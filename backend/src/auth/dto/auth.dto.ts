import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
