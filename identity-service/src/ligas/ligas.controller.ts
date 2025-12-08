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
import { LigasService } from './ligas.service';
import { CreateLigasDto } from './dto/create-ligas.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { User } from '../auth/decorators/user.decorator';
import { JwtPayload } from '../auth/jwt-payload.interface';
import { UpdateLigasDto } from './dto/update-ligas.dto';

@Controller('ligas')
export class LigasController {
  constructor(private readonly ligasService: LigasService) {}

  @Post()
  @Roles(Role.Professor)
  create(
    @Body() createLigasDto: CreateLigasDto,
    @User() usuarioLogado: JwtPayload,
  ) {
    return this.ligasService.create(createLigasDto, usuarioLogado.sub);
  }

  @Get()
  findAll() {
    return this.ligasService.findAll();
  }

  @Patch(':id/entrar')
  @Roles(Role.Aluno)
  entrarNaLiga(
    @Param('id', ParseIntPipe) idLiga: number,
    @User() usuarioLogado: JwtPayload,
  ) {
    return this.ligasService.adicionarAluno(idLiga, usuarioLogado.sub);
  }

  @Patch(':id')
  @Roles(Role.Professor)
  update(
    @Param('id', ParseIntPipe) idLiga: number,
    @Body() updateLigasDto: UpdateLigasDto,
    @User() usuarioLogado: JwtPayload,
  ) {
    return this.ligasService.update(idLiga, updateLigasDto, usuarioLogado.sub);
  }

  @Delete(':id')
  @Roles(Role.Professor)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', ParseIntPipe) idLiga: number,
    @User() usuarioLogado: JwtPayload,
  ) {
    return this.ligasService.remove(idLiga, usuarioLogado.sub);
  }
}
