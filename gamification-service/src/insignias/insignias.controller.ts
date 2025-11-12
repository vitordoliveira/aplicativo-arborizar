// src/insignias/insignias.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { InsigniasService } from './insignias.service';
import { CreateInsigniaDto } from './dto/create-insignia.dto';

@Controller('insignias')
export class InsigniasController {
  constructor(private readonly insigniasService: InsigniasService) {}

  @Post()
  create(@Body() createInsigniaDto: CreateInsigniaDto) {
    return this.insigniasService.create(createInsigniaDto);
  }

  @Get()
  findAll() {
    return this.insigniasService.findAll();
  }
}
