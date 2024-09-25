import { Controller } from "@nestjs/common";

import { RingService } from "./ring.service";

@Controller("ring")
export class RingController {
  constructor(private readonly ringService: RingService) {}
}
