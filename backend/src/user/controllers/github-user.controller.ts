import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { errorResponsePatternStructure } from "src/global/swagger.config";
import { ReqUser } from "src/global/types";

import { DeleteUserGithubDto } from "../dto/delete-user.github.dto";
import { UpdateUserGithubDto } from "../dto/update-user.github.dto";
import { User } from "../entities/user.entity";
import { GithubUserService } from "../providers/github-user.service";
import { updateApiOkResponse } from "../utils/swagger.config";

@Controller("user/github")
@ApiTags("User/Github")
export class GithubUserController {
  constructor(private readonly githubUserService: GithubUserService) {}

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("defaultBearerAuth")
  @ApiOkResponse(updateApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserGithubDto: UpdateUserGithubDto,
    @Req() req: ReqUser,
  ): Promise<Pick<User, "id" | "username" | "email">> {
    return await this.githubUserService.update(id, updateUserGithubDto, req);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("defaultBearerAuth")
  @ApiOkResponse({
    description: "No body returned for response",
  })
  @ApiResponse(errorResponsePatternStructure)
  async delete(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) deleteUserGithubDto: DeleteUserGithubDto,
    @Req() req: ReqUser,
  ): Promise<null> {
    return await this.githubUserService.delete(id, deleteUserGithubDto, req);
  }
}
