import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags("App")
export class AppController {
  @Get()
  @ApiResponse({ status: 200, description: "Pong!" })
  @ApiOperation({ summary: "Ping!" })
  ping(): string {
    return "Pong!";
  }
}
