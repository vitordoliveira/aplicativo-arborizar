// src/usuarios/dto/create-usuario.dto.ts

import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsIn,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  nome: string;

  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  password: string;

  // --- A CORREÇÃO ESTÁ AQUI ---
  @IsIn(['aluno', 'professor', 'admin'], {
    message: 'O tipo deve ser "aluno", "professor" ou "admin".',
  })
  @IsNotEmpty({ message: 'O tipo de usuário é obrigatório.' })
  tipo: string;

  @IsOptional()
  @IsString()
  matricula?: string;

  @IsOptional()
  @IsString()
  disciplina?: string;
}
