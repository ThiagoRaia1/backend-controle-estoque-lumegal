import { EntradaSaida } from 'src/entrada-saida/entities/entrada-saida.entity';
import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';
import { TipoUnidade } from 'src/tipo-unidade/entities/tipo-unidade.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Epi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  @Column()
  descricao: string;

  @Column()
  certificadoAprovacao: string;

  @Column()
  quantidade: number;

  @Column()
  quantidadeParaAviso: number;

  @ManyToOne(() => TipoUnidade, (tipoUnidade) => tipoUnidade.epis, {
    eager: true, // opcional: traz o tipoUnidade junto no find
    nullable: false, // obrigatório
  })
  tipoUnidade: TipoUnidade;

  @ManyToMany(() => Fornecedor, (fornecedor) => fornecedor.epis)
  @JoinTable()
  fornecedores: Fornecedor[];

  @OneToMany(() => EntradaSaida, (entradaSaida) => entradaSaida.epi)
  entradasSaidas: EntradaSaida[];
}
