import { Epi } from 'src/epi/entities/epi.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TipoUnidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  tipo: string;

  @OneToMany(() => Epi, (epi) => epi.tipoUnidade)
  epis: Epi[];
}
