// src/usuarios/entities/aluno.entity.ts

import { ChildEntity, Column } from 'typeorm';
import { Usuario } from './usuario.entity';

// @ChildEntity('aluno') diz ao TypeORM que quando o campo 'tipo' for 'aluno',
// ele deve criar uma instância desta classe.
@ChildEntity('aluno')
export class Aluno extends Usuario {
  @Column({ type: 'varchar', length: 20, unique: true })
  matricula: string;
}
