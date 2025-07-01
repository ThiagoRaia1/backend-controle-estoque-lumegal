import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class CategoriaFornecedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  categoria: string;

  @OneToMany(() => Fornecedor, (fornecedor) => fornecedor.categoriaFornecedor)
  fornecedores: Fornecedor[];
}
