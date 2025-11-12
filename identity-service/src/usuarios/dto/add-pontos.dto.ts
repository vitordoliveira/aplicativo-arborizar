// identity-service/src/usuarios/dto/add-pontos.dto.ts

import { IsNumber, IsPositive } from 'class-validator';

export class AddPontosDto {
  @IsNumber()
  @IsPositive()
  pontos: number;

  @IsNumber()
  xp: number;
}
