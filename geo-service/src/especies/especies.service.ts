// src/especies/especies.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Especie } from './entities/especie.entity';
import { Repository } from 'typeorm';
import { UpdateEspecieDto } from './dto/update-especie.dto'; // 1. IMPORTAR

@Injectable()
export class EspeciesService {
  constructor(
    @InjectRepository(Especie)
    private readonly especieRepository: Repository<Especie>,
  ) {}

  create(createEspecieDto: CreateEspecieDto): Promise<Especie> {
    const especie = this.especieRepository.create(createEspecieDto);
    return this.especieRepository.save(especie);
  }

  findAll(): Promise<Especie[]> {
    return this.especieRepository.find();
  }

  // --- MÉTODOS NOVOS ADICIONADOS ---

  async findOne(id: number): Promise<Especie> {
    const especie = await this.especieRepository.findOneBy({ id_especie: id });
    if (!especie) {
      throw new NotFoundException(`Espécie com ID #${id} não encontrada.`);
    }
    return especie;
  }

  async update(
    id: number,
    updateEspecieDto: UpdateEspecieDto,
  ): Promise<Especie> {
    const especie = await this.especieRepository.preload({
      id_especie: id,
      ...updateEspecieDto,
    });
    if (!especie) {
      throw new NotFoundException(`Espécie com ID #${id} não encontrada.`);
    }
    return this.especieRepository.save(especie);
  }

  async remove(id: number): Promise<void> {
    const result = await this.especieRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Espécie com ID #${id} não encontrada.`);
    }
  }
}
