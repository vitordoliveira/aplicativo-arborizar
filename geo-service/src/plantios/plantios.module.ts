import { Module } from '@nestjs/common';
import { PlantiosService } from './plantios.service';
import { PlantiosController } from './plantios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plantio } from './entities/plantio.entity';
import { EspeciesModule } from '../especies/especies.module';
import { RabbitMQModule } from '../messaging/rabbitmq.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plantio]),
    EspeciesModule,
    RabbitMQModule,
  ],
  controllers: [PlantiosController],
  providers: [PlantiosService],
  exports: [PlantiosService],
})
export class PlantiosModule {}
