// geo-service/src/messaging/rabbitmq.module.ts

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GAMIFICATION_SERVICE', // Um nome/token para injetar este cliente
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5772'], // URL de conexão
          queue: 'gamification_queue', // O nome da "fila" para onde as mensagens irão
        },
      },
    ]),
  ],
  exports: [ClientsModule], // Exporta o módulo para que outros possam injetar o cliente
})
export class RabbitMQModule {}
