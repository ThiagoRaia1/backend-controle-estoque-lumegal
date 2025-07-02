import { IsDate, IsDefined, IsNumber } from 'class-validator';

export class CreateEntradaSaidaDto {
  @IsNumber()
  @IsDefined({ message: 'ID do epi é obrigatório' })
  idEpi: number;

  @IsNumber()
  @IsDefined({ message: 'Quantidade é obrigatória' })
  quantidade: number;

  data: Date;
}
