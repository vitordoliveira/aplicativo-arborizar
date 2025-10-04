// src/plantios/plantios.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlantioDto } from './dto/create-plantio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plantio } from './entities/plantio.entity';
import { Repository } from 'typeorm';
import { EspeciesService } from '../especies/especies.service';

@Injectable()
export class PlantiosService {
  constructor(
    @InjectRepository(Plantio)
    private readonly plantioRepository: Repository<Plantio>,
    private readonly especiesService: EspeciesService,
  ) {}

  async create(createPlantioDto: CreatePlantioDto): Promise<Plantio> {
    const especie = await this.especiesService.findOne(
      createPlantioDto.id_especie,
    );

    const novoPlantio = this.plantioRepository.create({
      ...createPlantioDto,
      especie: especie,
    });

    return this.plantioRepository.save(novoPlantio);
  }

  findAll() {
    return this.plantioRepository.find();
  }

  // ADICIONE ESTE MÉTODO ABAIXO
  async findOne(id: number): Promise<Plantio> {
    const plantio = await this.plantioRepository.findOneBy({ id_plantio: id });
    if (!plantio) {
      throw new NotFoundException(`Plantio com ID #${id} não encontrado.`);
    }
    return plantio;
  }
}
