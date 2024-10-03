import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
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
}