import { Suprimento } from 'src/suprimento/entities/suprimento.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EntradaSaidaSuprimento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Suprimento,
    (suprimento) => suprimento.entradasSaidasSuprimento,
  )
  @JoinColumn({ name: 'idSuprimento' }) // <-- isso define o nome da coluna
  suprimento: Suprimento;

  @Column()
  quantidade: number;

  @Column()
  data: Date;
}
