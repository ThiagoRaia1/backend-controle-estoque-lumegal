import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Epi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  certificadoAprovacao: string;

  @Column()
  quantidade: number;

  @Column()
  quantidadeParaAviso: number;

  @Column()
  tipoUnidade: string;

  @ManyToMany(() => Fornecedor, (fornecedor) => fornecedor.epis)
  @JoinTable() // <-- SOMENTE aqui no lado "dono" da relação
  fornecedores: Fornecedor[];
}
