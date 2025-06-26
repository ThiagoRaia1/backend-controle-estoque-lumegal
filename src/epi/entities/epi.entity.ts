import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Epi {
  @ObjectIdColumn()
  _id: ObjectId;

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
