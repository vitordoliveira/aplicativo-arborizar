import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
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

  @Get('me')
  getMyProfile(@User() usuarioLogado: JwtPayload) {
    return this.usuariosService.findOne(usuarioLogado.sub);
  }

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

  @Get('ranking/global')
  getRankingGlobal(@Req() req: Request) {
    const authToken = req.headers['authorization'] || '';
    return this.usuariosService.getRankingGlobal(authToken);
  }

  @Get('me/posicao')
  async getRankingPosition(@User() usuarioLogado: JwtPayload) {
    const posicao = await this.usuariosService.getRankingPosition(
      usuarioLogado.sub,
    );
    return { posicao: posicao };
  }
}
