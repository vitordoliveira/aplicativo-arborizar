import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateZonaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsNumber()
  @IsNotEmpty()
  meta_arvores: number;
}
