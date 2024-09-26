import { PartialType } from "@nestjs/swagger";

import { CreateRingDto } from "./create-ring.dto";

export class UpdateRingDto extends PartialType(CreateRingDto) {}
