import { Controller, UseGuards, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AneisService } from './aneis.service';
import { Anel } from './anel.entity';
import { CreateAnelDto, UpdateAnelDto } from '../dto/anel.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/authenticated-request.interface';

@ApiTags('aneis')
@Controller('aneis')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AneisController {
  constructor(private readonly aneisService: AneisService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os anéis do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de anéis retornada com sucesso', type: [Anel] })
  findAll(@Req() req: AuthenticatedRequest): Promise<Anel[]> {
    return this.aneisService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um anel pelo ID' })
  @ApiResponse({ status: 200, description: 'Anel encontrado com sucesso', type: Anel })
  @ApiResponse({ status: 404, description: 'Anel não encontrado ou não pertence ao usuário' })
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: AuthenticatedRequest): Promise<Anel> {
    return this.aneisService.findOneByUser(id, req.user.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo anel' })
  @ApiResponse({ status: 201, description: 'Anel criado com sucesso', type: Anel })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou limite de anéis atingido' })
  create(@Body() createAnelDto: CreateAnelDto, @Req() req: AuthenticatedRequest): Promise<Anel> {
    return this.aneisService.create(createAnelDto, req.user.userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um anel existente' })
  @ApiResponse({ status: 200, description: 'Anel atualizado com sucesso', type: Anel })
  @ApiResponse({ status: 404, description: 'Anel não encontrado ou não pertence ao usuário' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnelDto: UpdateAnelDto,
    @Req() req: AuthenticatedRequest
  ): Promise<Anel> {
    return this.aneisService.update(id, updateAnelDto, req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um anel' })
  @ApiResponse({ status: 204, description: 'Anel removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Anel não encontrado ou não pertence ao usuário' })
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: AuthenticatedRequest): Promise<void> {
    return this.aneisService.remove(id, req.user.userId);
  }
}