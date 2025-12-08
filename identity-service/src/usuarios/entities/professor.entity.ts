import { ChildEntity, Column, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Liga } from '../../ligas/entities/liga.entity';

@ChildEntity('professor')
export class Professor extends Usuario {
  @Column({ type: 'varchar', length: 100, nullable: true })
  disciplina: string;

  @OneToMany(() => Liga, (liga) => liga.lider)
  ligasLideradas: Liga[];
}
