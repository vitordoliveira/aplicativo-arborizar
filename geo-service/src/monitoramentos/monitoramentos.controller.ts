import { Controller, Get, Post, Body } from '@nestjs/common';
import { MonitoramentosService } from './monitoramentos.service';
import { CreateMonitoramentoDto } from './dto/create-monitoramento.dto';

@Controller('monitoramentos')
export class MonitoramentosController {
  constructor(private readonly monitoramentosService: MonitoramentosService) {}

  @Post()
  create(@Body() createMonitoramentoDto: CreateMonitoramentoDto) {
    return this.monitoramentosService.create(createMonitoramentoDto);
  }

  @Get()
  findAll() {
    return this.monitoramentosService.findAll();
  }
}
