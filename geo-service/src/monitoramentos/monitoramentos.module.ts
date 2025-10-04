// src/monitoramentos/monitoramentos.module.ts

import { Module } from '@nestjs/common';
import { MonitoramentosService } from './monitoramentos.service';
import { MonitoramentosController } from './monitoramentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monitoramento } from './entities/monitoramento.entity';
import { PlantiosModule } from '../plantios/plantios.module'; // 1. IMPORTAR

@Module({
  // 2. Adicionar os módulos necessários
  imports: [TypeOrmModule.forFeature([Monitoramento]), PlantiosModule],
  controllers: [MonitoramentosController],
  providers: [MonitoramentosService],
})
export class MonitoramentosModule {}
