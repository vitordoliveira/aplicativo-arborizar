// src/auth/auth.controller.ts

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator'; // <-- IMPORTAÇÃO CRUCIAL

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public() // <-- DECORATOR CRUCIAL
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginDto: LoginDto) {
    // O código só chega aqui se for @Public
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    return this.authService.login(user);
  }
}
