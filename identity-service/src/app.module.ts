// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LigasModule } from './ligas/ligas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5800, // Correto
      username: 'arborizar_user',
      password: '4r80r1z4r', // Sua senha
      database: 'arborizar_db',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsuariosModule,
    AuthModule,
    LigasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
