import { ChildEntity, Column, ManyToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Liga } from '../../ligas/entities/liga.entity';

@ChildEntity('aluno')
export class Aluno extends Usuario {
  @Column({ type: 'varchar', length: 50, nullable: true })
  matricula: string;

  @ManyToMany(() => Liga, (liga) => liga.alunos)
  ligas: Liga[];
}
