import { IsOptional, IsString } from 'class-validator';

export class UpdateEspecieDto {
  @IsString()
  @IsOptional()
  nome_popular?: string;

  @IsString()
  @IsOptional()
  nome_cientifico?: string;

  @IsString()
  @IsOptional()
  descricao?: string;
}
