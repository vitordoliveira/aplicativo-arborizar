import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CountPlantiosDto {
  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  alunoIds: number[];
}
