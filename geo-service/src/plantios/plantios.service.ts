// src/plantios/plantios.service.ts

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlantioDto } from './dto/create-plantio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plantio } from './entities/plantio.entity';
import { Repository } from 'typeorm';
import { EspeciesService } from '../especies/especies.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PlantiosService {
  constructor(
    @InjectRepository(Plantio)
    private readonly plantioRepository: Repository<Plantio>,
    private readonly especiesService: EspeciesService,
    @Inject('GAMIFICATION_SERVICE')
    private readonly rabbitClient: ClientProxy,
  ) {}

  async create(createPlantioDto: CreatePlantioDto): Promise<Plantio> {
    const especie = await this.especiesService.findOne(
      createPlantioDto.id_especie,
    );

    // O novo campo 'id_aluno' do DTO já é incluído aqui pelo spread operator.
    const novoPlantio = this.plantioRepository.create({
      ...createPlantioDto,
      especie: especie,
    });

    const plantioSalvo = await this.plantioRepository.save(novoPlantio);

    // O objeto 'plantioSalvo' agora contém o 'id_aluno' e será enviado no evento.
    this.rabbitClient.emit('plantio_registrado', {
      plantio: plantioSalvo,
    });

    return plantioSalvo;
  }

  findAll() {
    return this.plantioRepository.find();
  }

  async findOne(id: number): Promise<Plantio> {
    const plantio = await this.plantioRepository.findOneBy({ id_plantio: id });
    if (!plantio) {
      throw new NotFoundException(`Plantio com ID #${id} não encontrado.`);
    }
    return plantio;
  }
}
