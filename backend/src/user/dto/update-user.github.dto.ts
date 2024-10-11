import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

export class UpdateUserGithubDto {
  @IsOptional()
  @IsString()
  @Length(3, 20)
  @ApiProperty({
    required: false,
  })
  public username?: string;
}
