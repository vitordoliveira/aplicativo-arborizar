import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateZonaDto } from './dto/create-zona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Zona } from './entities/zona.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ZonasService {
  constructor(
    @InjectRepository(Zona)
    private readonly zonaRepository: Repository<Zona>,
  ) {}

  create(createZonaDto: CreateZonaDto) {
    const zona = this.zonaRepository.create(createZonaDto);
    return this.zonaRepository.save(zona);
  }

  findAll() {
    return this.zonaRepository.find();
  }

  async remove(id: number) {
    const result = await this.zonaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Zona #${id} não encontrada.`);
    }
  }
}
