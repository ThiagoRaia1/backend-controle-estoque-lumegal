import { EntradaSaidaEpi } from 'src/entrada-saida-epi/entities/entrada-saida-epi.entity';
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

  @Column('decimal', { precision: 10, scale: 2 })
  preco: string;

  @Column('decimal', { nullable: true })
  ipi: number;

  @ManyToOne(() => TipoUnidade, (tipoUnidade) => tipoUnidade.epis, {
    eager: true, // opcional: traz o tipoUnidade junto no find
    nullable: false, // obrigatório
  })
  tipoUnidade: TipoUnidade;

  @ManyToMany(() => Fornecedor, (fornecedor) => fornecedor.epis)
  @JoinTable()
  fornecedores: Fornecedor[];

  @OneToMany(() => EntradaSaidaEpi, (entradaSaidaEpi) => entradaSaidaEpi.epi)
  entradasSaidasEpi: EntradaSaidaEpi[];
}
