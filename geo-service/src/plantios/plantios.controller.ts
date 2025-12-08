import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlantiosService } from './plantios.service';
import { CreatePlantioDto } from './dto/create-plantio.dto';
import { User } from '../auth/decorators/user.decorator';
import { JwtPayload } from '../auth/jwt-payload.interface';
import { RawAuthToken } from '../auth/decorators/raw-token.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { CountPlantiosDto } from './dto/count-plantios.dto';

@Controller('plantios')
export class PlantiosController {
  constructor(private readonly plantiosService: PlantiosService) {}

  @Post()
  create(
    @Body() createPlantioDto: CreatePlantioDto,
    @User() usuarioLogado: JwtPayload,
    @RawAuthToken() authToken: string,
  ) {
    return this.plantiosService.create(
      createPlantioDto,
      usuarioLogado.sub,
      authToken,
    );
  }

  @Public()
  @Get()
  findAll() {
    return this.plantiosService.findAll();
  }

  @Get('stats/me')
  getMyStats(@User() usuarioLogado: JwtPayload) {
    return this.plantiosService.countForUser(usuarioLogado.sub);
  }

  @Post('stats/batch')
  getStatsBatch(@Body() countPlantiosDto: CountPlantiosDto) {
    return this.plantiosService.countBatchForUsers(countPlantiosDto.alunoIds);
  }
}
