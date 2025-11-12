// src/auth/decorators/user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../interfaces/request-with-user.interface'; // 1. IMPORTAR

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // 2. Usar a interface para dar o tipo correto ao request
    const request: RequestWithUser = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
