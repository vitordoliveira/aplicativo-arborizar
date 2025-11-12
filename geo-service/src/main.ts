// geo-service/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8082, '127.0.0.1');
}
void bootstrap(); // <-- CORREÇÃO AQUI
