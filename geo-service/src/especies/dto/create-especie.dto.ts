import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEspecieDto {
  @IsString()
  @IsNotEmpty()
  nome_popular: string;

  @IsString()
  @IsNotEmpty()
  nome_cientifico: string;

  @IsString()
  @IsOptional()
  descricao?: string;
}
