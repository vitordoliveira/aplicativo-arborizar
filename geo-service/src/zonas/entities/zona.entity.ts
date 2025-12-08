import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'zonas' })
export class Zona {
  @PrimaryGeneratedColumn()
  id_zona: number;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'int', default: 50 })
  meta_arvores: number;
}
