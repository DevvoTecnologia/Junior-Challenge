import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class DeleteUserGithubDto {
  @IsBoolean()
  @ApiProperty()
  public confirm!: boolean;
}
