// src/plantios/plantios.module.ts

import { Module } from '@nestjs/common';
import { PlantiosService } from './plantios.service';
import { PlantiosController } from './plantios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plantio } from './entities/plantio.entity';
import { EspeciesModule } from '../especies/especies.module';
import { RabbitMQModule } from '../messaging/rabbitmq.module'; // 1. IMPORTAR

@Module({
  imports: [
    TypeOrmModule.forFeature([Plantio]),
    EspeciesModule,
    RabbitMQModule, // 2. ADICIONAR O MÓDULO AQUI
  ],
  controllers: [PlantiosController],
  providers: [PlantiosService],
  exports: [PlantiosService],
})
export class PlantiosModule {}
