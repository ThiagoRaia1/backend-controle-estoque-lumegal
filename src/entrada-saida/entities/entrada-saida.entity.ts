import { Epi } from 'src/epi/entities/epi.entity';
import { Suprimento } from 'src/suprimento/entities/suprimento.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EntradaSaida {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Epi, (epi) => epi.entradasSaidas)
  @JoinColumn({ name: 'idEpi' }) // <-- isso define o nome da coluna
  epi: Epi;

  @ManyToOne(() => Suprimento, (suprimentos) => suprimentos.entradasSaidas)
  @JoinColumn({ name: 'idSuprimento' }) // <-- isso define o nome da coluna
  suprimento: Suprimento;

  @Column()
  quantidade: number;

  @Column()
  data: Date;
}
