// src/especies/entities/especie.entity.ts

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'especies' })
// A palavra 'export' aqui é a correção.
export class Especie {
  @PrimaryGeneratedColumn()
  id_especie: number;

  @Column({ type: 'varchar', length: 100 })
  nome_popular: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  nome_cientifico: string;

  @Column({ type: 'text' })
  descricao: string;
}
