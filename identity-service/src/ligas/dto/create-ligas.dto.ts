// src/ligas/dto/create-ligas.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLigasDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome da liga não pode estar vazio.' })
  nome_liga: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome da turma não pode estar vazio.' })
  nome_turma: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome da escola não pode estar vazio.' })
  nome_escola: string;
}
