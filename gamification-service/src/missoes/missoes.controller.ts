// src/missoes/missoes.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { MissoesService } from './missoes.service';
import { CreateMissaoDto } from './dto/create-missao.dto';

@Controller('missoes')
export class MissoesController {
  constructor(private readonly missoesService: MissoesService) {}

  @Post()
  create(@Body() createMissaoDto: CreateMissaoDto) {
    return this.missoesService.create(createMissaoDto);
  }

  @Get()
  findAll() {
    return this.missoesService.findAll();
  }
}
