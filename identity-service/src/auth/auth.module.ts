// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport'; // 1. IMPORTAR
import { JwtStrategy } from './strategies/jwt.strategy'; // 2. IMPORTAR

@Module({
  imports: [
    UsuariosModule,
    PassportModule, // 3. ADICIONAR AO ARRAY DE IMPORTS
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // 4. ADICIONAR A ESTRATÉGIA AOS PROVIDERS
})
export class AuthModule {}
