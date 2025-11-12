// src/ligas/ligas.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { LigasService } from './ligas.service';
import { CreateLigasDto } from './dto/create-ligas.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { User } from '../auth/decorators/user.decorator';
import { JwtPayload } from '../auth/jwt-payload.interface';

@Controller('ligas')
export class LigasController {
  constructor(private readonly ligasService: LigasService) {}

  /**
   * Cria uma nova liga (Apenas Professores)
   */
  @Post()
  @Roles(Role.Professor)
  create(
    @Body() createLigasDto: CreateLigasDto,
    @User() usuarioLogado: JwtPayload,
  ) {
    return this.ligasService.create(createLigasDto, usuarioLogado.sub);
  }

  /**
   * Lista todas as ligas (Todos usuários logados)
   */
  @Get()
  findAll() {
    return this.ligasService.findAll();
  }

  // --- ENDPOINT NOVO ADICIONADO ---
  /**
   * Permite que um aluno entre em uma liga (Apenas Alunos)
   */
  @Patch(':id/entrar')
  @Roles(Role.Aluno)
  entrarNaLiga(
    @Param('id', ParseIntPipe) idLiga: number,
    @User() usuarioLogado: JwtPayload,
  ) {
    return this.ligasService.adicionarAluno(idLiga, usuarioLogado.sub);
  }
}
