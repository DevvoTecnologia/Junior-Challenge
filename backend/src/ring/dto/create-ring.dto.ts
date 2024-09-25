import { IsNotEmpty, IsString } from "class-validator";

import { ForgedBy } from "../types/ForgedBy";

export class CreateRingDto {
  @IsString()
  @IsNotEmpty()
  public name: string; // Ex: "Narya, the Ring of Fire"

  @IsString()
  @IsNotEmpty()
  public power: string; // Ex: "The ring of Narya is set with a red ruby."

  @IsString()
  @IsNotEmpty()
  public owner: string; // Ex: "Gandalf"

  @IsString()
  @IsNotEmpty()
  public forgedBy: ForgedBy; // Ex: "Elfos"
}
