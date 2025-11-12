// src/ligas/dto/update-ligas.dto.ts

import { IsOptional, IsString } from 'class-validator'; // <-- CORRIGIDO AQUI

export class UpdateLigasDto {
  @IsString()
  @IsOptional()
  nome_liga?: string;

  @IsString()
  @IsOptional()
  nome_turma?: string;

  @IsString()
  @IsOptional()
  nome_escola?: string;
}
