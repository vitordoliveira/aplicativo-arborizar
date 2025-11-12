// src/usuarios/usuarios.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { AddPontosDto } from './dto/add-pontos.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator'; // 1. IMPORTAR Roles
import { Role } from '../common/enums/role.enum'; // 2. IMPORTAR Role

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Public()
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  // --- ROTA ATUALIZADA ---
  // 3. APLICAR O DECORATOR DE PAPEL
  // Esta rota agora SÓ pode ser acessada por usuários com o papel 'admin'
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id/pontos')
  addPontos(
    @Param('id', ParseIntPipe) id: number,
    @Body() addPontosDto: AddPontosDto,
  ) {
    return this.usuariosService.addPontos(id, addPontosDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
