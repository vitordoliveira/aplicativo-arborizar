// src/auth/guards/jwt-auth.guard.ts

import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Verifica se a rota tem o metadado 'isPublic' que definimos no decorator @Public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se for pública, permite o acesso imediatamente
    if (isPublic) {
      return true;
    }

    // Se não for pública, prossegue com a validação padrão do JWT
    return super.canActivate(context);
  }
}
