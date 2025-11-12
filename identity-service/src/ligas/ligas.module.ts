// src/ligas/ligas.module.ts

import { Module } from '@nestjs/common';
import { LigasService } from './ligas.service';
import { LigasController } from './ligas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Liga } from './entities/liga.entity';
import { Professor } from '../usuarios/entities/professor.entity';
import { Aluno } from '../usuarios/entities/aluno.entity'; // 1. IMPORTAR

@Module({
  imports: [
    TypeOrmModule.forFeature([Liga, Professor, Aluno]), // 2. ADICIONAR ALUNO
  ],
  controllers: [LigasController],
  providers: [LigasService],
})
export class LigasModule {}
