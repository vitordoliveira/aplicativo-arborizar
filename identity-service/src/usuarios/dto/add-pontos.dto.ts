import { IsNumber, IsPositive } from 'class-validator';

export class AddPontosDto {
  @IsNumber()
  @IsPositive()
  pontos: number;

  @IsNumber()
  xp: number;
}
