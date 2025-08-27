// src/usuarios/dto/create-usuario.dto.ts

import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsIn,
  IsOptional,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  nome: string;

  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  email: string;

  @IsIn(['aluno', 'professor'], {
    message: 'O tipo deve ser "aluno" ou "professor".',
  })
  @IsNotEmpty({ message: 'O tipo de usuário é obrigatório.' })
  tipo: string;

  // Campo opcional para alunos
  @IsOptional()
  @IsString()
  matricula?: string;

  // Campo opcional para professores
  @IsOptional()
  @IsString()
  disciplina?: string;
}
