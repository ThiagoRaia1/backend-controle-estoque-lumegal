import { IsDefined, IsNumber } from 'class-validator';

export class CreateEntradaSaidaSuprimentoDto {
  @IsNumber()
  idSuprimento: number;

  @IsNumber()
  @IsDefined({ message: 'Quantidade é obrigatória' })
  quantidade: number;

  data: Date;
}
