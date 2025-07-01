import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Epi } from '../../epi/entities/epi.entity';
import { CategoriaFornecedor } from 'src/categoria-fornecedor/entities/categoria-fornecedor.entity';
import { Endereco } from 'src/endereco/entities/endereco.entity';

@Entity()
export class Fornecedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  @ManyToMany(() => Endereco, (endereco) => endereco.fornecedores)
  @JoinTable()
  enderecos: Endereco[];

  @ManyToMany(() => Epi, (epi) => epi.fornecedores)
  epis: Epi[];

  @ManyToOne(() => CategoriaFornecedor, (categoria) => categoria.fornecedores, {
    eager: true, // opcional: já traz a categoria junto no find
    nullable: false, // ou true se quiser permitir fornecedor sem categoria
  })
  categoriaFornecedor: CategoriaFornecedor;
}
