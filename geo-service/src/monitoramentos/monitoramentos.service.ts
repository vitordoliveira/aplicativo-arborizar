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
    private readonly plantiosService: PlantiosService,
  ) {}

  async create(
    createMonitoramentoDto: CreateMonitoramentoDto,
  ): Promise<Monitoramento> {
    const plantio = await this.plantiosService.findOne(
      createMonitoramentoDto.id_plantio,
    );

    const novoMonitoramento = this.monitoramentoRepository.create({
      ...createMonitoramentoDto,
      plantio: plantio,
    });

    return this.monitoramentoRepository.save(novoMonitoramento);
  }

  findAll() {
    return this.monitoramentoRepository.find();
  }
}
