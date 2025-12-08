import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import type { RequestWithUser } from './interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
    return this.authService.login(user);
  }

  @Get('me/dashboard')
  getDashboard(@Req() req: RequestWithUser) {
    const usuarioLogado = req.user;

    const authTokenHeader = req.headers['authorization'];
    if (!authTokenHeader) {
      throw new UnauthorizedException('Token de autorização não encontrado');
    }

    const authToken = authTokenHeader.split(' ')[1];
    if (!authToken) {
      throw new UnauthorizedException('Token de autorização mal formatado');
    }

    return this.authService.getDashboardData(usuarioLogado.sub, authToken);
  }
}
