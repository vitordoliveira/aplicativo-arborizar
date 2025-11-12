// src/usuarios/entities/aluno.entity.ts

import { ChildEntity, Column, ManyToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Liga } from '../../ligas/entities/liga.entity'; // 1. IMPORTAR

@ChildEntity('aluno')
export class Aluno extends Usuario {
  @Column({ type: 'varchar', length: 50, nullable: true })
  matricula: string;

  // --- RELACIONAMENTO COM LIGA ---
  // Muitos Alunos podem estar em Muitas Ligas
  @ManyToMany(() => Liga, (liga) => liga.alunos)
  ligas: Liga[]; // 2. ADICIONAR
}
