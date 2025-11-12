// src/especies/especies.controller.ts

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
import { EspeciesService } from './especies.service';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { Public } from '../auth/decorators/public.decorator';

@Controller('especies')
export class EspeciesController {
  constructor(private readonly especiesService: EspeciesService) {}

  @Post()
  @Roles(Role.Admin) // 1. Protegido: Só Admins podem criar
  create(@Body() createEspecieDto: CreateEspecieDto) {
    return this.especiesService.create(createEspecieDto);
  }

  @Get()
  @Public() // 2. Deixamos público para o App React Native poder listar
  findAll() {
    return this.especiesService.findAll();
  }

  // --- MÉTODOS NOVOS ADICIONADOS ---

  @Get(':id')
  @Public() // 3. Deixamos público para o App poder ver detalhes
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.especiesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin) // 4. Protegido: Só Admins podem atualizar
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEspecieDto: UpdateEspecieDto,
  ) {
    return this.especiesService.update(id, updateEspecieDto);
  }

  @Delete(':id')
  @Roles(Role.Admin) // 5. Protegido: Só Admins podem deletar
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.especiesService.remove(id);
  }
}
