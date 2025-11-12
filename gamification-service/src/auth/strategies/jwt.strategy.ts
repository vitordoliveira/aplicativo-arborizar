// src/auth/strategies/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // --- A CORREÇÃO ESTÁ AQUI ---
    // 1. Buscamos a chave secreta primeiro.
    const secret = configService.get<string>('JWT_SECRET');

    // 2. Verificamos se a chave foi encontrada. Se não, lançamos um erro claro.
    // Isso impede que a aplicação inicie sem a configuração de segurança essencial.
    if (!secret) {
      throw new Error(
        'A chave secreta JWT_SECRET não foi definida no arquivo .env',
      );
    }

    // 3. Agora que o TypeScript sabe que 'secret' é uma string, passamos para o super().
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
  validate(payload: JwtPayload) {
    // Agora o TypeScript sabe que payload.sub, payload.email e payload.tipo existem.
    return {
      id_usuario: payload.sub,
      email: payload.email,
      tipo: payload.tipo,
    };
  }
}
