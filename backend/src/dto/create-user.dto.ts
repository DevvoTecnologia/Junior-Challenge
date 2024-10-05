import { IsNotEmpty, IsString, IsEmail, IsUrl, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Email do usuário' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsNotEmpty()
  @IsString()
  senha: string;

  @ApiProperty({ description: 'URL da imagem de avatar do usuário', required: false })
  @IsOptional()
  @IsUrl()
  imagem?: string;

}