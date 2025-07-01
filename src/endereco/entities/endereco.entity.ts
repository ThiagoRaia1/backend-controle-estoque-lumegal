import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cidade: string;

  @ManyToMany(() => Fornecedor, (fornecedor) => fornecedor.enderecos)
  fornecedores: Fornecedor[];
}
