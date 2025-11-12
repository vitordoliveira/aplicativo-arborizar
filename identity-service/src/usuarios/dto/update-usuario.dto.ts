// src/usuarios/dto/update-usuario.dto.ts

import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUsuarioDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  @IsOptional()
  password?: string;

  // Campos específicos (opcionais)
  @IsString()
  @IsOptional()
  matricula?: string;

  @IsString()
  @IsOptional()
  disciplina?: string;
}
