import {
  Controller,
  Post,
  Body,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  UpdateUserWithPasswordDto,
  UpdatePasswordDto,
} from '../dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar dados do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Dados atualizados com sucesso',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado ou senha incorreta',
  })
  async updateProfile(
    @Request() req,
    @Body() updateUserDto: UpdateUserWithPasswordDto,
  ): Promise<User> {
    return this.usersService.updateUser(req.user.userId, updateUserDto);
  }

  @Put('password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar senha do usuário' })
  @ApiResponse({ status: 200, description: 'Senha atualizada com sucesso' })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado ou senha atual incorreta',
  })
  async updatePassword(
    @Request() req,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    await this.usersService.updatePassword(req.user.userId, updatePasswordDto);
  }
}
