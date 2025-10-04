// src/plantios/entities/plantio.entity.ts

import { Especie } from '../../especies/entities/especie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'plantios' })
export class Plantio {
  @PrimaryGeneratedColumn()
  id_plantio: number;

  @CreateDateColumn({ type: 'timestamp' })
  data_hora: Date;

  @Column({ type: 'varchar' })
  foto_url: string;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude: number;

  @ManyToOne(() => Especie)
  @JoinColumn({ name: 'id_especie_fk' })
  especie: Especie;
}
