import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateMissaoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  @IsPositive()
  pontos_recompensa: number;

  @IsNumber()
  @IsPositive()
  xp_recompensa: number;
}
