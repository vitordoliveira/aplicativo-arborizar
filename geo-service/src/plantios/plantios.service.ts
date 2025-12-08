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
    idAluno: number,
    authToken: string,
  ): Promise<Plantio> {
    const especie = await this.especiesService.findOne(
      createPlantioDto.id_especie,
    );

    const novoPlantio = this.plantioRepository.create({
      ...createPlantioDto,
      especie: especie,
      id_aluno: idAluno,
    });

    const plantioSalvo = await this.plantioRepository.save(novoPlantio);

    this.rabbitClient.emit('plantio_registrado', {
      plantio: plantioSalvo,
      authToken: authToken,
    });

    return plantioSalvo;
  }

  findAll() {
    return this.plantioRepository.find({
      relations: {
        especie: true,
      },
    });
  }

  async findOne(id: number): Promise<Plantio> {
    const plantio = await this.plantioRepository.findOneBy({ id_plantio: id });
    if (!plantio) {
      throw new NotFoundException(`Plantio com ID #${id} não encontrado.`);
    }
    return plantio;
  }

  async countForUser(idAluno: number): Promise<number> {
    return this.plantioRepository.count({
      where: {
        id_aluno: idAluno,
      },
    });
  }

  async countBatchForUsers(
    alunoIds: number[],
  ): Promise<Record<number, number>> {
    if (alunoIds.length === 0) {
      return {};
    }

    interface RawCountResult {
      id_aluno: number;
      contagem: string;
    }

    const results: RawCountResult[] = await this.plantioRepository
      .createQueryBuilder('plantio')
      .select('plantio.id_aluno', 'id_aluno')
      .addSelect('COUNT(plantio.id_plantio)', 'contagem')
      .where('plantio.id_aluno IN (:...alunoIds)', { alunoIds })
      .groupBy('plantio.id_aluno')
      .getRawMany();

    const countsMap: Record<number, number> = {};
    for (const result of results) {
      countsMap[result.id_aluno] = parseInt(result.contagem, 10);
    }
    return countsMap;
  }
}
