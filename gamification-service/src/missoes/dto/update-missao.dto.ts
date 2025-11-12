// src/missoes/dto/update-missao.dto.ts

import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateMissaoDto {
  @IsString()
  @IsOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  pontos_recompensa?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  xp_recompensa?: number;
}
