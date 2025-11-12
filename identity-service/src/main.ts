// identity-service/src/main.ts

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalGuards(
    new JwtAuthGuard(app.get(Reflector)),
    new RolesGuard(app.get(Reflector)),
  );

  // --- A CORREÇÃO ESTÁ AQUI ---
  // Forçamos o servidor a escutar apenas no 'localhost' (127.0.0.1)
  await app.listen(8081, '127.0.0.1');
}
void bootstrap();
