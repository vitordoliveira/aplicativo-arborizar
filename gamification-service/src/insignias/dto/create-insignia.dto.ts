import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateInsigniaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsUrl()
  @IsNotEmpty()
  imagem_url: string;
}
