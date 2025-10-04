// src/monitoramentos/monitoramentos.service.ts

import { Injectable } from '@nestjs/common';
import { CreateMonitoramentoDto } from './dto/create-monitoramento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Monitoramento } from './entities/monitoramento.entity';
import { Repository } from 'typeorm';
import { PlantiosService } from '../plantios/plantios.service'; // IMPORTAR

@Injectable()
export class MonitoramentosService {
  constructor(
    @InjectRepository(Monitoramento)
    private readonly monitoramentoRepository: Repository<Monitoramento>,
    // Injetar o PlantiosService para validação
    private readonly plantiosService: PlantiosService,
  ) {}

  async create(
    createMonitoramentoDto: CreateMonitoramentoDto,
  ): Promise<Monitoramento> {
    // REGRA DE NEGÓCIO: Verificar se o plantio informado existe.
    const plantio = await this.plantiosService.findOne(
      createMonitoramentoDto.id_plantio,
    );

    // Se o plantio existe, criamos a nova entidade Monitoramento
    const novoMonitoramento = this.monitoramentoRepository.create({
      ...createMonitoramentoDto, // Copia foto_url e observacoes
      plantio: plantio, // Associa o objeto completo do plantio encontrado
    });

    // Salva o novo monitoramento no banco
    return this.monitoramentoRepository.save(novoMonitoramento);
  }

  findAll() {
    return this.monitoramentoRepository.find();
  }
}
