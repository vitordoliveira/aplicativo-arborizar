// src/usuarios/usuarios.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { Aluno } from './entities/aluno.entity'; // 1. IMPORTAR
import { Professor } from './entities/professor.entity'; // 2. IMPORTAR

@Module({
  // 3. Adicionar as novas entidades ao array
  imports: [TypeOrmModule.forFeature([Usuario, Aluno, Professor])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
