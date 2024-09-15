import { RingForgedByType } from "src/db/entities/ring.entity";

export class CreateRingDTO {
  name: string;
  power: string;
  bearer: string;
  forgedBy: RingForgedByType;
  image: string;
}
