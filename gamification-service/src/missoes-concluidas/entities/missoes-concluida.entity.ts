import { Missao } from '../../missoes/entities/missao.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'aluno_missoes_concluidas' })
export class MissaoConcluida {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_aluno' })
  id_aluno: number;

  @CreateDateColumn({ name: 'data_conclusao' })
  data_conclusao: Date;

  @ManyToOne(() => Missao)
  @JoinColumn({ name: 'id_missao_fk' })
  missao: Missao;
}
