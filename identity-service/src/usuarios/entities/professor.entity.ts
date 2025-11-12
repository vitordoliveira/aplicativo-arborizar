// src/usuarios/entities/professor.entity.ts

import { ChildEntity, Column, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Liga } from '../../ligas/entities/liga.entity'; // 1. IMPORTAR

@ChildEntity('professor')
export class Professor extends Usuario {
  @Column({ type: 'varchar', length: 100, nullable: true })
  disciplina: string;

  // --- RELACIONAMENTO COM LIGA ---
  // Um Professor pode liderar Muitas Ligas
  @OneToMany(() => Liga, (liga) => liga.lider)
  ligasLideradas: Liga[]; // 2. ADICIONAR
}
