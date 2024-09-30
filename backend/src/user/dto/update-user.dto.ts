import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @ApiProperty()
  public newPassword?: string;
}
