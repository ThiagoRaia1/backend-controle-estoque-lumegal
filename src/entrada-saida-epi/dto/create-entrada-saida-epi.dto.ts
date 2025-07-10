import { IsDefined, IsNumber } from 'class-validator';

export class CreateEntradaSaidaEpiDto {
  @IsNumber()
  idEpi: number;

  @IsNumber()
  @IsDefined({ message: 'Quantidade é obrigatória' })
  quantidade: number;

  data: Date;
}
