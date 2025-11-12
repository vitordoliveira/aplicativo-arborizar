// src/auth/guards/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { RequestWithUser } from '../interfaces/request-with-user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request: RequestWithUser = context.switchToHttp().getRequest();
    const { user } = request;

    // --- LOGS DE DEPURAÇÃO ---
    console.log('--- DEBUG: RolesGuard ---');
    console.log('Papel do Usuário (do token):', user.tipo);
    console.log('Papéis Exigidos (da rota):', requiredRoles);
    // --- FIM DOS LOGS ---

    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    const hasPermission = requiredRoles.some((role) => user.tipo === role);

    console.log('Permissão Concedida:', hasPermission);
    console.log('---------------------------');

    return hasPermission;
  }
}
