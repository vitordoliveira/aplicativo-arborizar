// src/missoes-concluidas/missoes-concluidas.module.ts

import { Module } from '@nestjs/common';
import { MissoesConcluidasService } from './missoes-concluidas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissaoConcluida } from './entities/missoes-concluida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MissaoConcluida])],
  providers: [MissoesConcluidasService],
  exports: [MissoesConcluidasService], // Exporta o serviço para o EventsController usar
})
export class MissoesConcluidasModule {}
