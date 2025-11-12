// src/missoes-concluidas/missoes-concluidas.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MissaoConcluida } from './entities/missoes-concluida.entity';
import { Repository } from 'typeorm';
import { Missao } from '../missoes/entities/missao.entity';

@Injectable()
export class MissoesConcluidasService {
  constructor(
    @InjectRepository(MissaoConcluida)
    private readonly repository: Repository<MissaoConcluida>,
  ) {}

  /**
   * Verifica se um aluno já completou uma missão específica.
   */
  async jaCompletou(idAluno: number, idMissao: number): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        id_aluno: idAluno,
        missao: { id_missao: idMissao },
      },
    });
    return count > 0;
  }

  /**
   * Registra que um aluno completou uma missão.
   */
  async registrarConclusao(
    idAluno: number,
    missao: Missao,
  ): Promise<MissaoConcluida> {
    const novaConclusao = this.repository.create({
      id_aluno: idAluno,
      missao: missao,
    });
    return this.repository.save(novaConclusao);
  }
}
