import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateInsigniaDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsUrl()
  @IsOptional()
  imagem_url?: string;
}
