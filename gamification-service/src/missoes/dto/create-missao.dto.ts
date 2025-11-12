// src/missoes/dto/create-missao.dto.ts

import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateMissaoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  @IsPositive() // Garante que a recompensa seja um número positivo
  pontos_recompensa: number;

  @IsNumber()
  @IsPositive()
  xp_recompensa: number;
}
