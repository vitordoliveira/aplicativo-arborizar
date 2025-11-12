// src/auth/strategies/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../jwt-payload.interface'; // A interface que espera 'sub'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error(
        'A chave secreta JWT_SECRET não foi definida no arquivo .env',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  /**
   * Este método é chamado automaticamente pelo Passport após o JWT ser validado.
   * O que ele retorna é o que será anexado ao objeto `request` como `request.user`.
   */

  // --- A CORREÇÃO ESTÁ AQUI ---
  // Retornamos o payload original, que contém '.sub',
  // como nossos controllers esperam.
  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
