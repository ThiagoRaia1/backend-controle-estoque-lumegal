import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  senha: string;
  
  @Column()
  nome: string;
  
  @Column()
  tipoAcesso: string;
}
