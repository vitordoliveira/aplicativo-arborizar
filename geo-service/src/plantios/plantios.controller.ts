// src/plantios/plantios.controller.ts

// 1. Importações de 'ParseIntPipe' e 'Param' REMOVIDAS daqui
import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlantiosService } from './plantios.service';
import { CreatePlantioDto } from './dto/create-plantio.dto';
import { User } from '../auth/decorators/user.decorator';
import { JwtPayload } from '../auth/jwt-payload.interface';
import { RawAuthToken } from '../auth/decorators/raw-token.decorator';
import { Public } from '../auth/decorators/public.decorator';

@Controller('plantios')
export class PlantiosController {
  constructor(private readonly plantiosService: PlantiosService) {}

  @Post()
  create(
    @Body() createPlantioDto: CreatePlantioDto,
    @User() usuarioLogado: JwtPayload,
    @RawAuthToken() authToken: string,
  ) {
    return this.plantiosService.create(
      createPlantioDto,
      usuarioLogado.sub,
      authToken,
    );
  }

  @Public()
  @Get()
  findAll() {
    return this.plantiosService.findAll();
  }
}
