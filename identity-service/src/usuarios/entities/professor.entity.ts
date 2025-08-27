// src/usuarios/entities/professor.entity.ts

import { ChildEntity, Column } from 'typeorm';
import { Usuario } from './usuario.entity';

@ChildEntity('professor')
export class Professor extends Usuario {
  @Column({ type: 'varchar', length: 50 })
  disciplina: string;
}
