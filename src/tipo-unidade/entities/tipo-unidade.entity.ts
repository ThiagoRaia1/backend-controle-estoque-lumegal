import { Epi } from 'src/epi/entities/epi.entity';
import { Suprimento } from 'src/suprimento/entities/suprimento.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TipoUnidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  tipo: string;

  @OneToMany(() => Epi, (epi) => epi.tipoUnidade)
  epis: Epi[];

  @OneToMany(() => Suprimento, (suprimento) => suprimento.tipoUnidade)
  suprimentos: Suprimento[];
}
