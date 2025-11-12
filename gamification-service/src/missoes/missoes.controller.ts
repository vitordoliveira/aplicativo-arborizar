// src/missoes/missoes.controller.ts

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
import { MissoesService } from './missoes.service';
import { CreateMissaoDto } from './dto/create-missao.dto';
import { UpdateMissaoDto } from './dto/update-missao.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { Public } from '../auth/decorators/public.decorator';

@Controller('missoes')
export class MissoesController {
  constructor(private readonly missoesService: MissoesService) {}

  @Post()
  @Roles(Role.Admin) // 1. Protegido: Só Admins podem criar
  create(@Body() createMissaoDto: CreateMissaoDto) {
    return this.missoesService.create(createMissaoDto);
  }

  @Get()
  @Public() // 2. Deixamos público para o App React Native poder listar
  findAll() {
    return this.missoesService.findAll();
  }

  // --- MÉTODOS NOVOS ADICIONADOS ---

  @Get(':id')
  @Public() // 3. Deixamos público para o App poder ver detalhes
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.missoesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin) // 4. Protegido: Só Admins podem atualizar
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMissaoDto: UpdateMissaoDto,
  ) {
    return this.missoesService.update(id, updateMissaoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin) // 5. Protegido: Só Admins podem deletar
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 No Content (sucesso sem corpo)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.missoesService.remove(id);
  }
}
