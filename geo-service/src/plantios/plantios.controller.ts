// src/plantios/plantios.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlantiosService } from './plantios.service';
import { CreatePlantioDto } from './dto/create-plantio.dto';

@Controller('plantios')
export class PlantiosController {
  constructor(private readonly plantiosService: PlantiosService) {}

  @Post()
  create(@Body() createPlantioDto: CreatePlantioDto) {
    return this.plantiosService.create(createPlantioDto);
  }

  @Get()
  findAll() {
    return this.plantiosService.findAll();
  }
}
