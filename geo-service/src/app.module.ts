import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspeciesModule } from './especies/especies.module';
import { PlantiosModule } from './plantios/plantios.module';
import { MonitoramentosModule } from './monitoramentos/monitoramentos.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { ZonasModule } from './zonas/zonas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    PassportModule,

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
    EspeciesModule,
    PlantiosModule,
    MonitoramentosModule,
    ZonasModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
