// src/missoes/missoes.service.ts

import { Injectable } from '@nestjs/common';
import { CreateMissaoDto } from './dto/create-missao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Missao } from './entities/missao.entity';
import { Repository } from 'typeorm';

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
}
