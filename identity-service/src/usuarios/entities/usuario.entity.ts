import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
} from 'typeorm';

@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 20 })
  tipo: string;

  @Column({ type: 'int', default: 0 })
  pontos_totais: number;

  @Column({ type: 'int', default: 0 })
  xp_total: number;
}
