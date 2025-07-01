import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class CategoriaFornecedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  categoria: string;

  @ManyToMany(() => Fornecedor, (fornecedor) => fornecedor.categoriasFornecedor)
  fornecedores: Fornecedor[];
}
