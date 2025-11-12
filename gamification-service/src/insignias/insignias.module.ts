// src/insignias/insignias.module.ts

import { Module } from '@nestjs/common';
import { InsigniasService } from './insignias.service';
import { InsigniasController } from './insignias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insignia } from './entities/insignia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Insignia])], // <-- Registra a entidade aqui
  controllers: [InsigniasController],
  providers: [InsigniasService],
})
export class InsigniasModule {}
