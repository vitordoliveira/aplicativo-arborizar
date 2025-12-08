import { Module } from '@nestjs/common';
import { MissoesConcluidasService } from './missoes-concluidas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissaoConcluida } from './entities/missoes-concluida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MissaoConcluida])],
  providers: [MissoesConcluidasService],
  exports: [MissoesConcluidasService],
})
export class MissoesConcluidasModule {}
