import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

import type { ForgedBy } from "../types/ForgedBy";

export class CreateRingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name!: string; // Ex: "Narya, the Ring of Fire"

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public power!: string; // Ex: "The ring of Narya is set with a red ruby."

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public owner!: string; // Ex: "Gandalf"

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    examples: ["Elfos", "Anões", "Homens", "Sauron"],
  })
  public forgedBy!: ForgedBy; // Ex: "Elfos"
}
