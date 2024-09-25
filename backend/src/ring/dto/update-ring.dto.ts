import { PartialType } from "@nestjs/mapped-types";

import { CreateRingDto } from "./create-ring.dto";

export class UpdateRingDto extends PartialType(CreateRingDto) {}
