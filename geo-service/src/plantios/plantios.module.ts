// src/plantios/plantios.module.ts

import { Module } from '@nestjs/common';
import { PlantiosService } from './plantios.service';
import { PlantiosController } from './plantios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plantio } from './entities/plantio.entity';
import { EspeciesModule } from '../especies/especies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Plantio]), EspeciesModule],
  controllers: [PlantiosController],
  providers: [PlantiosService],
  exports: [PlantiosService], // <-- ADICIONE ESTA LINHA
})
export class PlantiosModule {}
