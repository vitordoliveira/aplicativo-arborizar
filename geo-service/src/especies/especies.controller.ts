// src/especies/especies.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { EspeciesService } from './especies.service';
import { CreateEspecieDto } from './dto/create-especie.dto';

@Controller('especies')
export class EspeciesController {
  constructor(private readonly especiesService: EspeciesService) {}

  @Post()
  create(@Body() createEspecieDto: CreateEspecieDto) {
    return this.especiesService.create(createEspecieDto);
  }

  @Get()
  findAll() {
    return this.especiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.especiesService.findOne(id);
  }
}
