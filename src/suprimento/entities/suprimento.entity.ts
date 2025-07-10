import { EntradaSaidaSuprimento } from 'src/entrada-saida-suprimento/entities/entrada-saida-suprimento.entity';
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
export class Suprimento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  @Column()
  descricao: string;

  @Column()
  quantidade: number;

  @Column()
  quantidadeParaAviso: number;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: string;

  @ManyToOne(() => TipoUnidade, (tipoUnidade) => tipoUnidade.suprimentos, {
    eager: true, // opcional: traz o tipoUnidade junto no find
    nullable: false, // obrigatório
  })
  tipoUnidade: TipoUnidade;

  @ManyToMany(() => Fornecedor, (fornecedor) => fornecedor.suprimentos)
  @JoinTable()
  fornecedores: Fornecedor[];

  @OneToMany(
    () => EntradaSaidaSuprimento,
    (entradaSaidaSuprimento) => entradaSaidaSuprimento.suprimento,
  )
  entradasSaidasSuprimento: EntradaSaidaSuprimento[];
}
