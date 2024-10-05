import { IsString, IsEmail, IsOptional, MinLength, IsUrl, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'Nome do usuário', required: false })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({ description: 'Email do usuário', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'URL da imagem de avatar do usuário', required: false })
  @IsOptional()
  @IsUrl()
  imagem?: string;
}

export class UpdateUserWithPasswordDto extends UpdateUserDto {
  @ApiProperty({ description: 'Senha atual do usuário' })
  @IsNotEmpty()
  @IsString()
  senhaAtual: string;
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