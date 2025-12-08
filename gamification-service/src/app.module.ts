import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissoesModule } from './missoes/missoes.module';
import { InsigniasModule } from './insignias/insignias.module';
import { EventsController } from './events/events.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { MissoesConcluidasModule } from './missoes-concluidas/missoes-concluidas.module';

@Module({
  imports: [
    HttpModule,
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5800,
      username: 'arborizar_user',
      password: '4r80r1z4r',
      database: 'arborizar_db',
      synchronize: true,
      autoLoadEntities: true,
    }),
    MissoesModule,
    InsigniasModule,
    MissoesConcluidasModule,
  ],
  controllers: [EventsController],
  providers: [JwtStrategy],
})
export class AppModule {}
