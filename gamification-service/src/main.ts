// gamification-service/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5772'],
      queue: 'gamification_queue',
      queueOptions: {
        durable: true, // <-- A CORREÇÃO É AQUI
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(8083, '127.0.0.1');
}
void bootstrap();
