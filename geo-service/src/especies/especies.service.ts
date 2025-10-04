// src/especies/especies.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { Especie } from './entities/especie.entity';

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

  async findOne(id: number): Promise<Especie> {
    const especie = await this.especieRepository.findOneBy({ id_especie: id });
    if (!especie) {
      throw new NotFoundException(`Espécie com ID #${id} não encontrada.`);
    }
    return especie;
  }
}
