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
  @Roles(Role.Admin)
  create(@Body() createMissaoDto: CreateMissaoDto) {
    return this.missoesService.create(createMissaoDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.missoesService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.missoesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMissaoDto: UpdateMissaoDto,
  ) {
    return this.missoesService.update(id, updateMissaoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.missoesService.remove(id);
  }
}
