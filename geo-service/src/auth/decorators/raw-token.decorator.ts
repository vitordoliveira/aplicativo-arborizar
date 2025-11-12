// geo-service/src/auth/decorators/raw-token.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express'; // 1. IMPORTAR o tipo 'Request'

export const RawAuthToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // 2. ADICIONAR O TIPO 'Request' aqui
    const request: Request = ctx.switchToHttp().getRequest();

    // 3. Agora o TypeScript e o ESlint sabem que 'request.headers' existe
    const authHeader = request.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1]; // Retorna só o token
    }
    return null;
  },
);
