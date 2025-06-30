import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  
  @Column()
  fornecedor: string;
}
