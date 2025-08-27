// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module'; // 1. ADICIONADO: Importamos nosso novo módulo de usuários

@Module({
  imports: [
    // Configuração GERAL da conexão com o banco de dados.
    // Note que o array 'entities' foi REMOVIDO daqui.
    // A responsabilidade de dizer quais entidades usar agora é de cada módulo específico.
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'arborizar_user',
      password: '4r80r1z4r', // Lembre-se de colocar sua senha real
      database: 'arborizar_db',
      synchronize: true, // Continuará recriando a tabela para nós
      autoLoadEntities: true, // Ajuda o TypeORM a encontrar as entidades registradas nos módulos
    }),

    // 2. ADICIONADO: Importamos o UsuariosModule.
    // Ao fazer isso, o AppModule passa a conhecer tudo que o UsuariosModule exporta,
    // incluindo o acesso ao repositório de Usuario.
    UsuariosModule,
  ],
  controllers: [], // O AppController foi removido, então fica vazio
  providers: [], // O AppService foi removido, então fica vazio
})
export class AppModule {}
