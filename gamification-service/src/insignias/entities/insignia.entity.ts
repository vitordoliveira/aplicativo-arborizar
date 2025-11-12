// src/insignias/entities/insignia.entity.ts

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'insignias' })
export class Insignia {
  @PrimaryGeneratedColumn()
  id_insignia: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nome: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ name: 'imagem_url', type: 'varchar' })
  imagem_url: string;
}
