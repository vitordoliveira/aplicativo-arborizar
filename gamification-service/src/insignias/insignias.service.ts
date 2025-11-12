// src/insignias/insignias.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInsigniaDto } from './dto/create-insignia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Insignia } from './entities/insignia.entity';
import { Repository } from 'typeorm';
import { UpdateInsigniaDto } from './dto/update-insignia.dto'; // 1. IMPORTAR

@Injectable()
export class InsigniasService {
  constructor(
    @InjectRepository(Insignia)
    private readonly insigniaRepository: Repository<Insignia>,
  ) {}

  create(createInsigniaDto: CreateInsigniaDto): Promise<Insignia> {
    const insignia = this.insigniaRepository.create(createInsigniaDto);
    return this.insigniaRepository.save(insignia);
  }

  findAll(): Promise<Insignia[]> {
    return this.insigniaRepository.find();
  }

  // --- MÉTODOS NOVOS ADICIONADOS ---

  async findOne(id: number): Promise<Insignia> {
    const insignia = await this.insigniaRepository.findOneBy({
      id_insignia: id,
    });
    if (!insignia) {
      throw new NotFoundException(`Insígnia com ID #${id} não encontrada.`);
    }
    return insignia;
  }

  async update(
    id: number,
    updateInsigniaDto: UpdateInsigniaDto,
  ): Promise<Insignia> {
    const insignia = await this.insigniaRepository.preload({
      id_insignia: id,
      ...updateInsigniaDto,
    });
    if (!insignia) {
      throw new NotFoundException(`Insígnia com ID #${id} não encontrada.`);
    }
    return this.insigniaRepository.save(insignia);
  }

  async remove(id: number): Promise<void> {
    const result = await this.insigniaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Insígnia com ID #${id} não encontrada.`);
    }
  }
}
