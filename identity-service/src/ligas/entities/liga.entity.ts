// src/ligas/entities/liga.entity.ts

import { Aluno } from '../../usuarios/entities/aluno.entity';
import { Professor } from '../../usuarios/entities/professor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'ligas' })
export class Liga {
  @PrimaryGeneratedColumn()
  id_liga: number;

  @Column({ type: 'varchar', length: 150 })
  nome_liga: string;

  @Column({ type: 'varchar', length: 100 })
  nome_turma: string;

  @Column({ type: 'varchar', length: 200 })
  nome_escola: string;

  // --- RELACIONAMENTO COM PROFESSOR (Líder) ---
  // Muitas Ligas podem pertencer a UM Professor
  @ManyToOne(() => Professor, (professor) => professor.ligasLideradas)
  @JoinColumn({ name: 'id_professor_lider_fk' })
  lider: Professor;

  // --- RELACIONAMENTO COM ALUNO (Membros) ---
  // Muitas Ligas podem ter Muitos Alunos
  @ManyToMany(() => Aluno, (aluno) => aluno.ligas)
  @JoinTable({
    name: 'liga_alunos', // Nome da tabela de junção
    joinColumn: { name: 'id_liga_fk', referencedColumnName: 'id_liga' },
    inverseJoinColumn: {
      name: 'id_aluno_fk',
      referencedColumnName: 'id_usuario',
    },
  })
  alunos: Aluno[];
}
