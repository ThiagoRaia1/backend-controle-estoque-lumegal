import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
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

  @ManyToMany(() => CategoriaFornecedor, (categoria) => categoria.fornecedores, {
    eager: true, // carrega automaticamente as categorias
  })
  @JoinTable() // <- lado dono da relação
  categoriasFornecedor: CategoriaFornecedor[];
}
