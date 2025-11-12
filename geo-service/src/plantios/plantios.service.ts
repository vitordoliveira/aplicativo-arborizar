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

  async create(
    createPlantioDto: CreatePlantioDto,
    idAluno: number, // ID do aluno vindo do token
    authToken: string, // Token bruto
  ): Promise<Plantio> {
    const especie = await this.especiesService.findOne(
      createPlantioDto.id_especie,
    );

    const novoPlantio = this.plantioRepository.create({
      ...createPlantioDto,
      especie: especie,
      id_aluno: idAluno, // Salva o ID do aluno vindo do token
    });

    const plantioSalvo = await this.plantioRepository.save(novoPlantio);

    // Envia o evento com o plantio E o token
    this.rabbitClient.emit('plantio_registrado', {
      plantio: plantioSalvo,
      authToken: authToken, // Adiciona o token à mensagem
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
