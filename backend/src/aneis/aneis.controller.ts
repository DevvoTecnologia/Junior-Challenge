import { Controller, UseGuards, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AneisService } from './aneis.service';
import { Anel } from './anel.entity';
import { CreateAnelDto, UpdateAnelDto } from './dto/anel.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/authenticated-request.interface';

@ApiTags('aneis')
@Controller('aneis')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AneisController {
  constructor(private readonly aneisService: AneisService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os anéis' })
  @ApiResponse({ status: 200, description: 'Lista de anéis retornada com sucesso', type: [Anel] })
  findAll(): Promise<Anel[]> {
    return this.aneisService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um anel pelo ID' })
  @ApiResponse({ status: 200, description: 'Anel encontrado com sucesso', type: Anel })
  @ApiResponse({ status: 404, description: 'Anel não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Anel> {
    return this.aneisService.findOne(id);
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
  @ApiResponse({ status: 404, description: 'Anel não encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnelDto: UpdateAnelDto,
  ): Promise<Anel> {
    return this.aneisService.update(id, updateAnelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um anel' })
  @ApiResponse({ status: 204, description: 'Anel removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Anel não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.aneisService.remove(id);
  }
}