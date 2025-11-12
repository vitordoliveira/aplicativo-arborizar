// src/usuarios/entities/usuario.entity.ts

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

  // --- CAMPO ADICIONADO ---
  // A senha é armazenada no banco, mas nunca retornada nas respostas da API.
  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  // Esta coluna 'tipo' é o nosso "discriminador" para herança.
  @Column({ type: 'varchar', length: 20 })
  tipo: string;

  @Column({ type: 'int', default: 0 })
  pontos_totais: number;

  @Column({ type: 'int', default: 0 })
  xp_total: number;
}
