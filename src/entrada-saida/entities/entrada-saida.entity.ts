import { Epi } from 'src/epi/entities/epi.entity';
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

  @Column()
  quantidade: number;

  @Column()
  data: Date;
}
