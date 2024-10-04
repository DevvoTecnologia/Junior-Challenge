import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false, description: 'Nome do usuário' })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({ required: false, description: 'Email do usuário' })
  @IsOptional()
  @IsEmail()
  email?: string;
}

export class UpdatePasswordDto {
  @ApiProperty({ description: 'Senha atual do usuário' })
  @IsString()
  @MinLength(6)
  senhaAtual: string;

  @ApiProperty({ description: 'Nova senha do usuário' })
  @IsString()
  @MinLength(6)
  novaSenha: string;
}