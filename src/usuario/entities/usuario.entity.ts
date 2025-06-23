import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class Usuario {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  login: string;

  @Column()
  senha: string;
  
  @Column()
  tipoAcesso: string;
}
