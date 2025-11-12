// src/insignias/insignias.service.ts

import { Injectable } from '@nestjs/common';
import { CreateInsigniaDto } from './dto/create-insignia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Insignia } from './entities/insignia.entity';
import { Repository } from 'typeorm';

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
}
