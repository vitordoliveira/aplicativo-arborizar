// src/usuarios/usuarios.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { Aluno } from './entities/aluno.entity';
import { Professor } from './entities/professor.entity';
import { Admin } from './entities/admin.entity'; // 1. IMPORTAR

@Module({
  // 2. ADICIONAR 'Admin' AO ARRAY
  imports: [TypeOrmModule.forFeature([Usuario, Aluno, Professor, Admin])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
