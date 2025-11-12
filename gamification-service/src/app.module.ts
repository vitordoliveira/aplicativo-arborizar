import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissoesModule } from './missoes/missoes.module';
import { InsigniasModule } from './insignias/insignias.module';
import { EventsController } from './events/events.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5800,
      username: 'arborizar_user',
      password: '4r80r1z4r', // Lembre-se de usar sua senha real
      database: 'arborizar_db',
      synchronize: true,
      autoLoadEntities: true,
    }),
    MissoesModule,
    InsigniasModule,
  ],
  controllers: [EventsController],
  providers: [],
})
export class AppModule {}
