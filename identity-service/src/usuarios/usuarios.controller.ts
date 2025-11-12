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
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { User } from '../auth/decorators/user.decorator';
import { JwtPayload } from '../auth/jwt-payload.interface';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Public()
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Patch('me')
  updateMyProfile(
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @User() usuarioLogado: JwtPayload,
  ) {
    return this.usuariosService.update(usuarioLogado.sub, updateUsuarioDto);
  }

  // --- O ENDPOINT QUE FALTAVA ESTÁ AQUI ---
  /**
   * Retorna o perfil do usuário logado (baseado no token JWT)
   */
  @Get('me')
  getMyProfile(@User() usuarioLogado: JwtPayload) {
    // Reutiliza o 'findOne' com o ID do token (payload.sub)
    return this.usuariosService.findOne(usuarioLogado.sub);
  }
  // --- FIM DO NOVO ENDPOINT ---

  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  /**
   * ATENÇÃO: Esta rota GET /:id agora funciona,
   * mas 'me' será capturado pela rota @Get('me') primeiro.
   */
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
