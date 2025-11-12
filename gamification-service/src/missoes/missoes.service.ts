// src/missoes/missoes.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMissaoDto } from './dto/create-missao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Missao } from './entities/missao.entity';
import { Repository } from 'typeorm';
import { UpdateMissaoDto } from './dto/update-missao.dto'; // 1. IMPORTAR

@Injectable()
export class MissoesService {
  constructor(
    @InjectRepository(Missao)
    private readonly missaoRepository: Repository<Missao>,
  ) {}

  create(createMissaoDto: CreateMissaoDto): Promise<Missao> {
    const missao = this.missaoRepository.create(createMissaoDto);
    return this.missaoRepository.save(missao);
  }

  findAll(): Promise<Missao[]> {
    return this.missaoRepository.find();
  }

  // --- MÉTODOS NOVOS ADICIONADOS ---

  async findOne(id: number): Promise<Missao> {
    const missao = await this.missaoRepository.findOneBy({ id_missao: id });
    if (!missao) {
      throw new NotFoundException(`Missão com ID #${id} não encontrada.`);
    }
    return missao;
  }

  async update(id: number, updateMissaoDto: UpdateMissaoDto): Promise<Missao> {
    // Carrega a missão existente e aplica as alterações do DTO
    const missao = await this.missaoRepository.preload({
      id_missao: id,
      ...updateMissaoDto,
    });
    if (!missao) {
      throw new NotFoundException(`Missão com ID #${id} não encontrada.`);
    }
    return this.missaoRepository.save(missao);
  }

  async remove(id: number): Promise<void> {
    const result = await this.missaoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Missão com ID #${id} não encontrada.`);
    }
  }
}
