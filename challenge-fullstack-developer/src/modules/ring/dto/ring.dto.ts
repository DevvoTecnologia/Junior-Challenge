import { IsNotEmpty, IsString } from 'class-validator';

export class RingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  power: string;

  @IsString()
  @IsNotEmpty()
  carrier: string;

  @IsString()
  @IsNotEmpty()
  forgedBy: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}