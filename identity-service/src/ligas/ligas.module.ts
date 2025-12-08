import { Module } from '@nestjs/common';
import { LigasService } from './ligas.service';
import { LigasController } from './ligas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Liga } from './entities/liga.entity';
import { Professor } from '../usuarios/entities/professor.entity';
import { Aluno } from '../usuarios/entities/aluno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Liga, Professor, Aluno])],
  controllers: [LigasController],
  providers: [LigasService],
})
export class LigasModule {}
