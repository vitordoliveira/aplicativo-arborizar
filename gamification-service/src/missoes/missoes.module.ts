// src/missoes/missoes.module.ts

import { Module } from '@nestjs/common';
import { MissoesService } from './missoes.service';
import { MissoesController } from './missoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Missao } from './entities/missao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Missao])], // <-- Registra a entidade aqui
  controllers: [MissoesController],
  providers: [MissoesService],
})
export class MissoesModule {}
