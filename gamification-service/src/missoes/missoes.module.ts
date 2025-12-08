import { Module } from '@nestjs/common';
import { MissoesService } from './missoes.service';
import { MissoesController } from './missoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Missao } from './entities/missao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Missao])],
  controllers: [MissoesController],
  providers: [MissoesService],
  exports: [MissoesService],
})
export class MissoesModule {}
