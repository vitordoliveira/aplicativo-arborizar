// src/monitoramentos/entities/monitoramento.entity.ts

import { Plantio } from '../../plantios/entities/plantio.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'monitoramentos' })
export class Monitoramento {
  @PrimaryGeneratedColumn()
  id_monitoramento: number;

  @CreateDateColumn({ type: 'timestamp' })
  data_hora: Date;

  @Column({ type: 'varchar' })
  foto_url: string;

  @Column({ type: 'text', nullable: true }) // Observações podem ser opcionais
  observacoes: string;

  // --- RELACIONAMENTO COM PLANTIO ---
  // Muitos monitoramentos podem pertencer a UM plantio.
  @ManyToOne(() => Plantio)
  @JoinColumn({ name: 'id_plantio_fk' }) // A coluna da chave estrangeira
  plantio: Plantio;
}
