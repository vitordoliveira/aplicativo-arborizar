// geo-service/src/app.module.ts (VERSÃO FINAL E CORRETA)

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspeciesModule } from './especies/especies.module';
import { PlantiosModule } from './plantios/plantios.module';
import { MonitoramentosModule } from './monitoramentos/monitoramentos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'arborizar_user',
      password: '4r80r1z4r', // Lembre-se de usar sua senha real
      database: 'arborizar_db',
      synchronize: true,
      autoLoadEntities: true, // Voltamos a usar o autoLoad, que é a melhor prática
    }),

    EspeciesModule,

    PlantiosModule,

    MonitoramentosModule, // Importamos o módulo que gerencia as espécies
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
