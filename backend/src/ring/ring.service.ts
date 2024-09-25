import { Injectable } from "@nestjs/common";

import { CreateRingDto } from "./dto/create-ring.dto";

@Injectable()
export class RingService {
  create(createRingDto: CreateRingDto): CreateRingDto {
    const { name, power, owner, forgedBy, image } = createRingDto;

    return {
      name,
      power,
      owner,
      forgedBy,
      image,
    };
  }
}
