import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateAnelDto {
  @ApiProperty({ description: 'Nome do anel' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Poder do anel' })
  @IsNotEmpty()
  @IsString()
  poder: string;

  @ApiProperty({ description: 'Portador atual do anel' })
  @IsNotEmpty()
  @IsString()
  portador: string;

  @ApiProperty({ description: 'Quem forjou o anel' })
  @IsNotEmpty()
  @IsString()
  forjadoPor: string;

  @ApiProperty({ description: 'URL da imagem do anel' })
  @IsNotEmpty()
  @IsUrl()
  imagem: string;
}

export class UpdateAnelDto extends PartialType(CreateAnelDto) {}