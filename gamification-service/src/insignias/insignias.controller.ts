// src/insignias/insignias.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { InsigniasService } from './insignias.service';
import { CreateInsigniaDto } from './dto/create-insignia.dto';
import { UpdateInsigniaDto } from './dto/update-insignia.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { Public } from '../auth/decorators/public.decorator';

@Controller('insignias')
export class InsigniasController {
  constructor(private readonly insigniasService: InsigniasService) {}

  @Post()
  @Roles(Role.Admin) // 1. Protegido: Só Admins podem criar
  create(@Body() createInsigniaDto: CreateInsigniaDto) {
    return this.insigniasService.create(createInsigniaDto);
  }

  @Get()
  @Public() // 2. Deixamos público para o App React Native poder listar
  findAll() {
    return this.insigniasService.findAll();
  }

  // --- MÉTODOS NOVOS ADICIONADOS ---

  @Get(':id')
  @Public() // 3. Deixamos público para o App poder ver detalhes
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.insigniasService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin) // 4. Protegido: Só Admins podem atualizar
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInsigniaDto: UpdateInsigniaDto,
  ) {
    return this.insigniasService.update(id, updateInsigniaDto);
  }

  @Delete(':id')
  @Roles(Role.Admin) // 5. Protegido: Só Admins podem deletar
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.insigniasService.remove(id);
  }
}
