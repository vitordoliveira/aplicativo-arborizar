// src/missoes/entities/missao.entity.ts

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'missoes' })
export class Missao {
  @PrimaryGeneratedColumn()
  id_missao: number;

  @Column({ type: 'varchar', length: 150 })
  titulo: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ name: 'pontos_recompensa', type: 'int' })
  pontos_recompensa: number;

  @Column({ name: 'xp_recompensa', type: 'int' })
  xp_recompensa: number;
}
