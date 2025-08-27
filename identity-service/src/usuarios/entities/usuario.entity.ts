// src/usuarios/entities/usuario.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
} from 'typeorm';

// 1. Adicionamos o decorator @TableInheritance
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  // 2. Esta coluna 'tipo' será agora nosso "discriminador"
  @Column({ type: 'varchar', length: 20 })
  tipo: string;

  @Column({ type: 'int', default: 0 })
  pontos_totais: number;

  @Column({ type: 'int', default: 0 })
  xp_total: number;
}
